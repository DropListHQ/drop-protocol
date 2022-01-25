import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { arrayify, computeAddress, defaultAbiCoder, hexlify, randomBytes, SigningKey } from "ethers/lib/utils";
import { keccak256 } from '@ethersproject/keccak256';
import { buildMerkleTreeERC721, RecipientsDictFormatERC721, MerkleDistributorInfoERC721 } from "@drop-protocol/drop-sdk";
import { ethers } from "hardhat";
import { getClone } from "./utils";

const DECEMBER_31_2325 = 11234234223 // Thursday, December 31, 2325 8:37:03 PM                                                                                                                                
const JULY_30_2015 = 1438251133 // Thursday, July 30, 2015 10:12:13 AM

describe('MerkleDropERC721', () => {
    let signers: SignerWithAddress[];
    let snapshot: number;
    let factory: Contract;
    let template: Contract;
    let token: Contract;
    let drop: Contract;
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

        const Factory = await ethers.getContractFactory("DropFactory");
        factory = await Factory.deploy();
        await factory.deployed();

        const Drop = await ethers.getContractFactory("MerkleDropERC721");
        template = await Drop.deploy();
        await template.deployed();

        //deploy mock token to owner                                                                                                                                                                          
        const MockToken = await ethers.getContractFactory("ERC721Mock");
        token = await MockToken.deploy();
        await token.deployed();

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


        const ipfshash = ethers.utils.formatBytes32String("ipfshash");
        const expiration = DECEMBER_31_2325;
        drop = await getClone(factory.createDrop(template.address, token.address, merkletree.merkleRoot, expiration, ipfshash), Drop);

        // approve drop contract to transfer erc1155 tokens on sender's behalf
        await token.setApprovalForAll(drop.address, true);
    });

    beforeEach(async () => {
        snapshot = await ethers.provider.send("evm_snapshot", []);
    });

    afterEach(async () => {
        await ethers.provider.send("evm_revert", [snapshot]);
    });

    describe('isExpired()', () => {
        it('should not return expired for non-expired drop', async () => {
            expect(await drop.isExpired()).to.be.eq(false);
        })

        it('should return expired for expired drop', async () => {
            const Drop = await ethers.getContractFactory("MerkleDropERC1155");
            const expiration = JULY_30_2015;
            const ipfshash = ethers.utils.formatBytes32String("ipfshashExpired");
            const expiredDrop = await getClone(factory.createDrop(template.address, token.address, merkletree.merkleRoot, expiration, ipfshash), Drop);
            expect(await expiredDrop.isExpired()).to.be.eq(true);
        })
    })

    describe('claim()', () => {
        describe("valid drop & merkletree", () => {
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
            it('should not allow to execute claim with missed deadline', async () => {
                const Drop = await ethers.getContractFactory("MerkleDropERC721");
                const expiration = JULY_30_2015;
                const ipfshash = ethers.utils.formatBytes32String("ipfshashExpired");
                const expiredDrop = await getClone(factory.createDrop(template.address, token.address, merkletree.merkleRoot, expiration, ipfshash), Drop);
                await token.setApprovalForAll(expiredDrop.address, true);
                const claim = merkletree.claims[recipient1.address];
                await expect(expiredDrop.claim(claim.index, recipient1.address, claim.tokenId, claim.proof)).to.be.reverted;
            })
        })
    })
});
