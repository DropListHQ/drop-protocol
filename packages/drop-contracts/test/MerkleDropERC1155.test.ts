import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { arrayify, computeAddress, defaultAbiCoder, hexlify, randomBytes, SigningKey } from "ethers/lib/utils";
import { keccak256 } from '@ethersproject/keccak256';
import { buildMerkleTreeERC1155, RecipientsDataFormat } from "@drop-protocol/dropSDK";
import { ethers } from "hardhat";

const DECEMBER_31_2325 = 11234234223 // Thursday, December 31, 2325 8:37:03 PM                                                                                                                                
const JULY_30_2015 = 1438251133 // Thursday, July 30, 2015 10:12:13 AM                                                                                                                                         

describe('DropFactory', () => {
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
    let nonrecipient: SignerWithAddress;
    let sender: SignerWithAddress;
    let recipients: RecipientsDataFormat;

    before(async () => {
        signers = await ethers.getSigners();

        const Drop = await ethers.getContractFactory("MerkleDropERC1155");
        drop = await Drop.deploy();
        await drop.deployed();

        //deploy mock token to owner                                                                                                                                                                          
        const MockToken = await ethers.getContractFactory("ERC1155Mock");
        token = await MockToken.deploy();
        await token.deployed();

        // create merkle tree
        sender = signers[0];
        recipient1 = signers[1];
        recipient2 = signers[2];
        recipient3 = signers[3];
        nonrecipient = signers[4];

        recipients = {}
        recipients[recipient1.address] = { amount: 1, tokenId: 1, maxSupply: 1 };
        recipients[recipient2.address] = { amount: 1, tokenId: 2, maxSupply: 3 };
        recipients[recipient3.address] = { amount: 2, tokenId: 2, maxSupply: 3 };
    });

    beforeEach(async () => {
        snapshot = await ethers.provider.send("evm_snapshot", []);
    });

    afterEach(async () => {
        await ethers.provider.send("evm_revert", [snapshot]);
    });

    describe('init()', () => {
        it('inits the contract', async () => {
            const merkletree = buildMerkleTreeERC1155(recipients);
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
            const merkletree = buildMerkleTreeERC1155(recipients);
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
            const merkletree = buildMerkleTreeERC1155(recipients);
            const expiration = DECEMBER_31_2325;
            const ipfsHash = ethers.utils.formatBytes32String("ipfsHash");
            const tx = await drop.init(sender.address, token.address, merkletree.merkleRoot, expiration, ipfsHash);
            expect(await drop.isExpired()).to.be.eq(false);
        })

        it('should return expired for expired drop', async () => {
            const merkletree = buildMerkleTreeERC1155(recipients);
            const expiration = JULY_30_2015;
            const ipfsHash = ethers.utils.formatBytes32String("ipfsHash");
            const tx = await drop.init(sender.address, token.address, merkletree.merkleRoot, expiration, ipfsHash);

            expect(await drop.isExpired()).to.be.eq(true);
        })
    })
});
