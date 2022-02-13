import IPFSProvider from '../src/ipfs/provider'

describe('IPFS Provider', () => {
    it('should return correct data', async () => {
        const ipfshash = "Qme99gNyxamTfK6qWL8jfr6g9idEYvJREBJygDz334Z7QJ";
        const baseUrl = "https://gateway.pinata.cloud/ipfs"

        const ipfsProvider = new IPFSProvider(baseUrl);

        const data = await ipfsProvider.get(ipfshash);
        expect(data.merkleRoot).toEqual("0x0cfba2c2db9e66d803c37b3454e1809aca262d2205b0a9dea74add7a8c0faa4d");
    })
})
