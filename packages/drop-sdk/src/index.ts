import parseBalanceMap from "./merkle/parse-balance-map"

// RecipientData should be provided in the the following format: 
// {
//   [account: string]: {
//     amount: number | string,
//     tokenId: number | string,
//     maxSupply: number
//   }
// }
export const buildMerkleTreeERC1155 = (recipientsData: any) => {
    const merkleData = parseBalanceMap(recipientsData);
    return merkleData
}
