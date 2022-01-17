import parseBalanceMap, { MerkleDistributorInfoERC1155, RecipientsDictFormatERC1155, RecipientsArrayFormatERC1155 } from "./merkle/parse-balance-map-erc1155"

export const buildMerkleTreeERC1155 = (recipientsData: RecipientsDictFormatERC1155 | RecipientsArrayFormatERC1155[]): MerkleDistributorInfoERC1155 => {
    const merkleData = parseBalanceMap(recipientsData);
    return merkleData
}

// export const buildMerkleTreeERC20 = (recipientsData: RecipientsDataFormat1155): MerkleDistributorInfo => {
//     const merkleData = parseBalanceMap(recipientsData);
//     return merkleData
// }

export { MerkleDistributorInfoERC1155, RecipientsDictFormatERC1155, RecipientsArrayFormatERC1155 } from "./merkle/parse-balance-map-erc1155"
