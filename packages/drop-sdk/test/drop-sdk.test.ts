import { getDrop } from '../src'

describe('#getDrop', () => {
    it('should return drop instance', async () => {
        const ipfshash = "Qme99gNyxamTfK6qWL8jfr6g9idEYvJREBJygDz334Z7QJ";
        const drop = getDrop(ipfshash);
        console.log(drop.ipfshash)
        expect(drop.ipfshash).toEqual(ipfshash);        
    })
})
