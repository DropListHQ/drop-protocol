import DropSDK from '../src'
import { ethers } from 'ethers';
require('dotenv').config()

describe('#getDrop', () => {
    it('should return drop instance', async () => {
        const chainId = 4;
        const ipfshash = "Qme99gNyxamTfK6qWL8jfr6g9idEYvJREBJygDz334Z7QJ";
        const baseUrl = "https://gateway.pinata.cloud/ipfs"

        const infuraProjectId = process.env.INFURA_PROJECT_ID
        const provider = new ethers.providers.InfuraProvider('rinkeby', infuraProjectId);
        const dropSDK = new DropSDK(provider, chainId, baseUrl);

        const drop = await dropSDK.getDrop(ipfshash);
        expect(drop.ipfshash).toEqual(ipfshash);

        expect(drop.chainId).toEqual(4);
        expect(drop.tokenAddress).toEqual("0x568b228eb07cd317ac5fbeff620379145380a823");
        expect(drop.type).toEqual("erc20");
        expect(Object.keys(drop.claims).length).toEqual(2);

        // metadata
        expect(drop.metadata.description).toEqual("Test ERC20 (#1)");
        expect(drop.metadata.title).toEqual("Test ERC20 (#1)");


        const recipients = drop.getRecipients();
        expect(recipients.length).toEqual(2);
    })
})
