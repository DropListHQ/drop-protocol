import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { arrayify, computeAddress, defaultAbiCoder, hexlify, randomBytes, SigningKey } from "ethers/lib/utils";
import { keccak256 } from '@ethersproject/keccak256';
import { buildMerkleTreeERC721, RecipientsDictFormatERC721, MerkleDistributorInfoERC721 } from "@drop-protocol/drop-sdk";
import { ethers } from "hardhat";

const DECEMBER_31_2325 = 11234234223 // Thursday, December 31, 2325 8:37:03 PM                                                                                                                                
const JULY_30_2015 = 1438251133 // Thursday, July 30, 2015 10:12:13 AM                                                                                                                                         

describe('MerkleDropERC721', () => {
    let signers: SignerWithAddress[];
    let snapshot: number;
    let executor: Contract;
    let factory: Contract;
    let template: Contract;
    let token: Contract;
    let drop: Contract;
    let issuerkey: SigningKey;
    let issueraddress: string;
    let recipient1: SignerWithAddress;
    let recipient2: SignerWithAddress;
    let recipient3: SignerWithAddress;
    let recipient4: SignerWithAddress;
    let nonrecipient: SignerWithAddress;
    let sender: SignerWithAddress;
    let recipients: RecipientsDictFormatERC721;
    let merkletree: MerkleDistributorInfoERC721;

    before(async () => {
        signers = await ethers.getSigners();

        const Drop = await ethers.getContractFactory("MerkleDropERC721");
        drop = await Drop.deploy();
        await drop.deployed();

        //deploy mock token to owner                                                                                                                                                                          
        const MockToken = await ethers.getContractFactory("ERC721Mock");
        token = await MockToken.deploy();
        await token.deployed();

        // approve drop contract to transfer erc721 tokens on sender's behalf
        token.setApprovalForAll(drop.address, true);

        // create merkle tree
        sender = signers[0];
        recipient1 = signers[1];
        recipient2 = signers[2];
        recipient3 = signers[3];
        recipient4 = signers[4];
        nonrecipient = signers[5];

        recipients = {}
        recipients[recipient1.address] = { tokenId: 1 };
        recipients[recipient2.address] = { tokenId: 2 };
        recipients[recipient3.address] = { tokenId: 3 };
        recipients[recipient4.address] = { tokenId: 4 };
        merkletree = buildMerkleTreeERC721(recipients);
    });

    beforeEach(async () => {
        snapshot = await ethers.provider.send("evm_snapshot", []);
    });

    afterEach(async () => {
        await ethers.provider.send("evm_revert", [snapshot]);
    });

    describe('init()', () => {
        it('inits the contract', async () => {
            const expiration = DECEMBER_31_2325;
            const ipfsHash = ethers.utils.formatBytes32String("ipfsHash");
            const tx = await drop.init(sender.address, token.address, merkletree.merkleRoot, expiration, ipfsHash);

            expect(await drop.sender()).to.be.eq(sender.address);
            expect(await drop.merkleRoot()).to.be.eq(merkletree.merkleRoot);
            expect(await drop.token()).to.be.eq(token.address);
            expect(await drop.ipfsHash()).to.be.eq(ipfsHash);
            expect(await drop.expiration()).to.be.eq(expiration);
            expect(await drop.initialized()).to.be.eq(true);
        });

        it('does not allow to init contract twice', async () => {
            const expiration = DECEMBER_31_2325;
            const ipfsHash = ethers.utils.formatBytes32String("ipfsHash");

            // first tx to init the contract should go through
            const tx1 = await drop.init(sender.address, token.address, merkletree.merkleRoot, expiration, ipfsHash);

            // second tx should revert
            const fakeMerkleRoot = ethers.utils.formatBytes32String("MERKLE_ROOT");
            await expect(drop.init(sender.address, token.address, fakeMerkleRoot, expiration, ipfsHash)).to.be.reverted;
        });
    })

    describe('isExpire()', () => {
        it('should not return expired for non-expired drop', async () => {
            const expiration = DECEMBER_31_2325;
            const ipfsHash = ethers.utils.formatBytes32String("ipfsHash");
            const tx = await drop.init(sender.address, token.address, merkletree.merkleRoot, expiration, ipfsHash);
            expect(await drop.isExpired()).to.be.eq(false);
        })

        it('should return expired for expired drop', async () => {
            const expiration = JULY_30_2015;
            const ipfsHash = ethers.utils.formatBytes32String("ipfsHash");
            const tx = await drop.init(sender.address, token.address, merkletree.merkleRoot, expiration, ipfsHash);

            expect(await drop.isExpired()).to.be.eq(true);
        })
    })

    describe('claim()', () => {
        describe("valid drop & merkletree", () => {
            beforeEach(async () => {
                // init drop contract            
                const expiration = DECEMBER_31_2325;
                const ipfsHash = ethers.utils.formatBytes32String("ipfsHash");
                const tx = await drop.init(sender.address, token.address, merkletree.merkleRoot, expiration, ipfsHash);
            })

            it('should execute valid claim and emit ClaimedERC721 event', async () => {
                // execute valid claim
                const claim = merkletree.claims[recipient1.address];
                expect(await drop.isClaimed(claim.index)).to.be.equal(false);
                expect(await token.ownerOf(claim.tokenId)).to.be.eq(sender.address);

                const tx = await drop.claim(claim.index, recipient1.address, claim.tokenId, claim.proof);
                expect(await drop.isClaimed(claim.index)).to.be.equal(true);
                expect(await token.ownerOf(claim.tokenId)).to.be.eq(recipient1.address);

                const receipt = await tx.wait();
                const events = receipt.events;

                expect(events[2].event).to.equal('ClaimedERC721');
                expect(events[2].args.index).to.equal(claim.index);
                expect(events[2].args.tokenId).to.equal(claim.tokenId);
                expect(events[2].args.beneficiary).to.equal(recipient1.address);
            })

            it('should allow to execute claim only once', async () => {
                const claim = merkletree.claims[recipient1.address];

                // first claim tx should go through
                drop.claim(claim.index, recipient1.address, claim.tokenId, claim.proof);

                // second claim tx should revert
                await expect(drop.claim(claim.index, recipient1.address, claim.tokenId, claim.proof)).to.be.reverted;
            })

            it('should not allow to execute claim to wrong recipient', async () => {
                const claim = merkletree.claims[recipient1.address];
                await expect(drop.claim(claim.index, nonrecipient.address, claim.tokenId, claim.proof)).to.be.reverted;
            })
        })

        describe("missed deadline", () => {
            beforeEach(async () => {
                // init drop contract            
                const expiration = JULY_30_2015;
                const ipfsHash = ethers.utils.formatBytes32String("ipfsHash");
                const tx = await drop.init(sender.address, token.address, merkletree.merkleRoot, expiration, ipfsHash);
            })
            it('should not allow to execute claim with missed deadline', async () => {
                const claim = merkletree.claims[recipient1.address];
                await expect(drop.claim(claim.index, recipient1.address, claim.tokenId, claim.proof)).to.be.reverted;
            })
        })
    })
});
