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
    let issuerkey: SigningKey;
    let issueraddress: string;

    before(async () => {
        signers = await ethers.getSigners();

        const Factory = await ethers.getContractFactory("DropFactory");
        factory = await Factory.deploy();
        await factory.deployed();

        const Drop = await ethers.getContractFactory("BaseDrop");
        template = await Drop.deploy();
        await template.deployed();

        // deploy mock token toowner                                                                                                                                                                          
        const MockToken = await ethers.getContractFactory("ERC20Mock");
        token = await MockToken.deploy();
        await token.deployed();
    });

    beforeEach(async () => {
        snapshot = await ethers.provider.send("evm_snapshot", []);
    });

    afterEach(async () => {
        await ethers.provider.send("evm_revert", [snapshot]);
    });

    describe('createDrop()', () => {
        it('creates drop and emits event', async () => {
            const merkleRoot = ethers.utils.formatBytes32String("MERKLE_ROOT");
            const expiration = DECEMBER_31_2325;
            const ipfshash = ethers.utils.formatBytes32String("ipfshash");

            const tx = await factory.createDrop(template.address, token.address, merkleRoot, expiration, ipfshash);
            const receipt = await tx.wait();
            expect(receipt.events.length).to.equal(1);
            expect(receipt.events[0].event).to.equal('CreateDrop');

            const args = receipt.events[0].args;
            expect(args.token).to.equal(token.address);
            expect(args.template).to.equal(template.address);
            expect(args.expiration).to.equal(expiration);
            expect(args.ipfshash).to.equal(ipfshash);
        });

        it('can not create 2 drop contracts with the same IPFS hash', async () => {
            const merkleRoot = ethers.utils.formatBytes32String("MERKLE_ROOT");
            const expiration = DECEMBER_31_2325;
            const ipfshash = ethers.utils.formatBytes32String("ipfshash");

            const tx = await factory.createDrop(template.address, token.address, merkleRoot, expiration, ipfshash);
            await expect(factory.createDrop(template.address, token.address, merkleRoot, expiration, ipfshash)).to.be.reverted;
        });

    })
    describe('getDrop()', () => {
        it('correcty fetches Drop contract address by IPFS hash', async () => {
            const merkleRoot = ethers.utils.formatBytes32String("MERKLE_ROOT");
            const expiration = DECEMBER_31_2325;
            const ipfshash = ethers.utils.formatBytes32String("ipfshash");

            const tx = await factory.createDrop(template.address, token.address, merkleRoot, expiration, ipfshash);
            const receipt = await tx.wait();
            const args = receipt.events[0].args;
            const actualDropAddress = args.drop;
            const fetchedDropAddress = await factory.getDrop(ipfshash);

            expect(actualDropAddress).to.be.equal(fetchedDropAddress);
        });
    });
});
