import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract, ContractFactory, ContractTransaction } from "ethers";
import { arrayify, computeAddress, defaultAbiCoder, hexlify, randomBytes, SigningKey } from "ethers/lib/utils";
import { keccak256 } from '@ethersproject/keccak256';
import { buildMerkleTreeERC1155, RecipientsDictFormatERC1155, MerkleDistributorInfoERC1155 } from "@drop-protocol/drop-sdk";
import { ethers } from "hardhat";
import { getClone } from "./utils";

const DECEMBER_31_2325 = 11234234223 // Thursday, December 31, 2325 8:37:03 PM                                                                                                                                
const JULY_30_2015 = 1438251133 // Thursday, July 30, 2015 10:12:13 AM

describe('MerkleDropERC1155', () => {
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
    let recipients: RecipientsDictFormatERC1155;
    let merkletree: MerkleDistributorInfoERC1155;

    before(async () => {
        signers = await ethers.getSigners();

        const Factory = await ethers.getContractFactory("DropFactory");
        factory = await Factory.deploy();
        await factory.deployed();

        const Drop = await ethers.getContractFactory("MerkleDropERC1155");
        template = await Drop.deploy()
        await template.deployed()

        //deploy mock token to owner                                                                                                                                                                          
        const MockToken = await ethers.getContractFactory("ERC1155Mock");
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
        recipients[recipient1.address] = { amount: 1, tokenId: 1 };
        recipients[recipient2.address] = { amount: 1, tokenId: 2 };
        recipients[recipient3.address] = { amount: 2, tokenId: 2 };
        recipients[recipient4.address] = { amount: 1, tokenId: 1 };
        merkletree = buildMerkleTreeERC1155(recipients);

        const expiration = DECEMBER_31_2325;
        const ipfshash = ethers.utils.formatBytes32String("ipfshash");
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
            it('should execute valid claim and emit ClaimedERC1155 event', async () => {
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

            it('should allow to execute claim only once', async () => {
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

        describe("missed deadline", () => {
            it('should not allow to execute claim with missed deadline', async () => {
                const Drop = await ethers.getContractFactory("MerkleDropERC1155");
                const expiration = JULY_30_2015;
                const ipfshash = ethers.utils.formatBytes32String("ipfshashExpired");
                const expiredDrop = await getClone(factory.createDrop(template.address, token.address, merkletree.merkleRoot, expiration, ipfshash), Drop);
                await token.setApprovalForAll(expiredDrop.address, true);
                const claim = merkletree.claims[recipient1.address];
                await expect(expiredDrop.claim(claim.index, recipient1.address, claim.tokenId, claim.amount, claim.proof)).to.be.reverted;
            })
        })
    })
});
