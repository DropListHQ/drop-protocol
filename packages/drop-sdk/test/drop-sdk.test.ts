import DropSDK from '../src'

describe('#getDrop', () => {
    it('should return drop instance', async () => {
        const ipfshash = "Qme99gNyxamTfK6qWL8jfr6g9idEYvJREBJygDz334Z7QJ";
        const baseUrl = "https://gateway.pinata.cloud/ipfs"

        const dropSDK = new DropSDK(baseUrl)

        const drop = dropSDK.getDrop(ipfshash);
        expect(drop.ipfshash).toEqual(ipfshash);
    })
})
