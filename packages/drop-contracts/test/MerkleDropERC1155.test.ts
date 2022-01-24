import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract, ContractFactory, ContractTransaction } from "ethers";
import { arrayify, computeAddress, defaultAbiCoder, hexlify, randomBytes, SigningKey } from "ethers/lib/utils";
import { keccak256 } from '@ethersproject/keccak256';
import { buildMerkleTreeERC1155, RecipientsDictFormatERC1155, MerkleDistributorInfoERC1155 } from "@drop-protocol/drop-sdk";
import { ethers } from "hardhat";

const DECEMBER_31_2325 = 11234234223 // Thursday, December 31, 2325 8:37:03 PM                                                                                                                                
const JULY_30_2015 = 1438251133 // Thursday, July 30, 2015 10:12:13 AM                                                                                                                                         

async function getClone(call: Promise<ContractTransaction>, factory_: ContractFactory) {
    const tx = await call;
    const receipt = await tx.wait();
    let address = null;
    if (receipt.events) {
        for (const event of receipt.events) {
            if (event.event === "CreateDrop") {
                address = event ?.args ?.drop;
                break;
            }
        }
    }
    if (address !== null) {
        return factory_.attach(address);
    }
    throw new Error("Not a clone creation transaction");
}

describe('MerkleDropERC1155', () => {
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
    let recipients: RecipientsDictFormatERC1155;
    let merkletree: MerkleDistributorInfoERC1155;
    let dropClone: Contract;

    before(async () => {
        signers = await ethers.getSigners();

        const Factory = await ethers.getContractFactory("DropFactory");
        factory = await Factory.deploy();
        await factory.deployed();

        const Drop = await ethers.getContractFactory("MerkleDropERC1155");
        drop = await Drop.deploy();
        await drop.deployed();

        //deploy mock token to owner                                                                                                                                                                          
        const MockToken = await ethers.getContractFactory("ERC1155Mock");
        token = await MockToken.deploy();
        await token.deployed();

        // approve drop contract to transfer erc1155 tokens on sender's behalf
        await token.setApprovalForAll(drop.address, true);

        // create merkle tree
        sender = signers[0];
        recipient1 = signers[1];
        recipient2 = signers[2];
        recipient3 = signers[3];
        recipient4 = signers[4];
        nonrecipient = signers[5];

        recipients = {}
        recipients[recipient1.address] = { amount: 1, tokenId: 1 };
        recipients[recipient2.address] = { amount: 1, tokenId: 2 };
        recipients[recipient3.address] = { amount: 2, tokenId: 2 };
        recipients[recipient4.address] = { amount: 1, tokenId: 1 };
        merkletree = buildMerkleTreeERC1155(recipients);
    });

    beforeEach(async () => {
        snapshot = await ethers.provider.send("evm_snapshot", []);
    });

    afterEach(async () => {
        await ethers.provider.send("evm_revert", [snapshot]);
    });

    xdescribe('init()', () => {
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

    xdescribe('isExpire()', () => {
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
                //const tx = await drop.init(sender.address, token.address, merkletree.merkleRoot, expiration, ipfsHash);

                const Merkledroperc1155 = await ethers.getContractFactory("MerkleDropERC1155");
                dropClone = await getClone(factory.createDrop(drop.address, token.address, merkletree.merkleRoot, expiration, ipfsHash), Merkledroperc1155);
                const merkleRoot = await dropClone.merkleRoot();
                console.log({ merkleRoot, merkleTree: merkletree.merkleRoot })
                await token.setApprovalForAll(dropClone.address, true);
            })

            it('should execute valid claim and emit ClaimedERC1155 event (CLONE)', async () => {
                // execute valid claim
                const claim = merkletree.claims[recipient1.address];
                expect(await dropClone.isClaimed(claim.index)).to.be.equal(false);
                expect(await token.balanceOf(recipient1.address, claim.tokenId)).to.be.eq(0);

                const tx = await dropClone.claim(claim.index, recipient1.address, claim.tokenId, claim.amount, claim.proof);

                const receipt = await tx.wait();
                const events = receipt.events;

                expect(events[1].event).to.equal('ClaimedERC1155');
                expect(events[1].args.index).to.equal(claim.index);
                expect(events[1].args.tokenId).to.equal(claim.tokenId);
                expect(events[1].args.amount).to.equal(claim.amount);
                expect(events[1].args.beneficiary).to.equal(recipient1.address);

                console.log(`Clone claim: ${receipt.gasUsed}`);

                expect(await dropClone.isClaimed(claim.index)).to.be.equal(true);
                expect(await token.balanceOf(recipient1.address, claim.tokenId)).to.be.eq(claim.amount);

            })

            xit('should execute valid claim and emit ClaimedERC1155 event (DEFAULT)', async () => {
                // execute valid claim
                const claim = merkletree.claims[recipient1.address];
                expect(await drop.isClaimed(claim.index)).to.be.equal(false);
                expect(await token.balanceOf(recipient1.address, claim.tokenId)).to.be.eq(0);

                const tx = await drop.claim(claim.index, recipient1.address, claim.tokenId, claim.amount, claim.proof);
                expect(await drop.isClaimed(claim.index)).to.be.equal(true);
                expect(await token.balanceOf(recipient1.address, claim.tokenId)).to.be.eq(claim.amount);

                const receipt = await tx.wait();
                const events = receipt.events;

                expect(events[1].event).to.equal('ClaimedERC1155');
                expect(events[1].args.index).to.equal(claim.index);
                expect(events[1].args.tokenId).to.equal(claim.tokenId);
                expect(events[1].args.amount).to.equal(claim.amount);
                expect(events[1].args.beneficiary).to.equal(recipient1.address);

                console.log(`Default claim: ${receipt.gasUsed}`);
            })


            xit('should allow to execute claim only once', async () => {
                const claim = merkletree.claims[recipient1.address];

                // first claim tx should go through
                drop.claim(claim.index, recipient1.address, claim.tokenId, claim.amount, claim.proof);

                // second claim tx should revert
                await expect(drop.claim(claim.index, recipient1.address, claim.tokenId, claim.amount, claim.proof)).to.be.reverted;
            })

            it('should not allow to execute claim to wrong recipient', async () => {
                const claim = merkletree.claims[recipient1.address];
                await expect(drop.claim(claim.index, nonrecipient.address, claim.tokenId, claim.amount, claim.proof)).to.be.reverted;
            })
        })

        xdescribe("missed deadline", () => {
            beforeEach(async () => {
                // init drop contract            
                const expiration = JULY_30_2015;
                const ipfsHash = ethers.utils.formatBytes32String("ipfsHash");
                const tx = await drop.init(sender.address, token.address, merkletree.merkleRoot, expiration, ipfsHash);
            })
            it('should not allow to execute claim with missed deadline', async () => {
                const claim = merkletree.claims[recipient1.address];
                await expect(drop.claim(claim.index, recipient1.address, claim.tokenId, claim.amount, claim.proof)).to.be.reverted;
            })
        })
    })
});
