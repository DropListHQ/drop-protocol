import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { arrayify, computeAddress, defaultAbiCoder, hexlify, randomBytes, SigningKey } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { keccak256 } from '@ethersproject/keccak256';

const DECEMBER_31_2325 = 11234234223 // Thursday, December 31, 2325 8:37:03 PM                                                                                                                                

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

    before(async () => {
        signers = await ethers.getSigners();

        const Drop = await ethers.getContractFactory("MerkleDropERC1155");
        drop = await Drop.deploy();
        await drop.deployed();

        // // deploy mock token toowner                                                                                                                                                                          
        // const MockToken = await ethers.getContractFactory("ERC20Mock");
        // token = await MockToken.deploy();
    });

    beforeEach(async () => {
        snapshot = await ethers.provider.send("evm_snapshot", []);
    });

    afterEach(async () => {
        await ethers.provider.send("evm_revert", [snapshot]);
    });

    describe('createDrop()', () => {
        xit('creates drop and emits event', async () => {
            const merkleRoot = ethers.utils.formatBytes32String("MERKLE_ROOT");
            const expiration = DECEMBER_31_2325;
            const salt = ethers.utils.formatBytes32String("SALT");
            const ipfsHash = ethers.utils.formatBytes32String("ipfsHash");

            const tx = await factory.createDrop(template.address, token.address, merkleRoot, expiration, salt, ipfsHash);
            const receipt = await tx.wait();
            expect(receipt.events.length).to.equal(1);
            expect(receipt.events[0].event).to.equal('CreateDrop');
            const args = receipt.events[0].args;
            expect(args.token).to.equal(token.address);
            expect(args.template).to.equal(template.address);
            expect(args.expiration).to.equal(expiration);
            expect(args.ipfsHash).to.equal(ipfsHash);
        });
    })
});
