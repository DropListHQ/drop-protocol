import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { arrayify, computeAddress, defaultAbiCoder, hexlify, randomBytes, SigningKey } from "ethers/lib/utils";
import { ethers } from "hardhat";

describe('DropFactory', () => {
    let signers: SignerWithAddress[];
    let snapshot: number;
    let executor: Contract;
    let factory: Contract;
    let issuerkey: SigningKey;
    let issueraddress: string;

    before(async () => {
        signers = await ethers.getSigners();

        const Factory = await ethers.getContractFactory("DropFactory");
        factory = await Factory.deploy();
        await factory.deployed();
    });

    beforeEach(async () => {
        snapshot = await ethers.provider.send("evm_snapshot", []);
    });

    afterEach(async () => {
        await ethers.provider.send("evm_revert", [snapshot]);
    });

    describe('createDrop()', () => {
        xit('creates drop and emits event', async () => {
            throw new Error("Not implemented")
        });
    })
    describe('predictDropAddress()', () => {        
        xit('correcty precomputes Drop contract address', async () => {
            throw new Error("Not implemented")
        });       
    });
});
