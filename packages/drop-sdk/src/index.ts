import parseBalanceMapERC1155, { MerkleDistributorInfoERC1155, RecipientsDictFormatERC1155, RecipientsArrayFormatERC1155 } from "./merkle/parse-balance-map-erc1155"
import parseBalanceMapERC20, { MerkleDistributorInfoERC20, RecipientsDictFormatERC20, RecipientsArrayFormatERC20 } from "./merkle/parse-balance-map-erc20"

export const buildMerkleTreeERC1155 = (recipientsData: RecipientsDictFormatERC1155 | RecipientsArrayFormatERC1155[]): MerkleDistributorInfoERC1155 => {
    const merkleData = parseBalanceMapERC1155(recipientsData);
    return merkleData
}

export const buildMerkleTreeERC20 = (recipientsData: RecipientsDictFormatERC20 | RecipientsArrayFormatERC20[]): MerkleDistributorInfoERC20 => {
    const merkleData = parseBalanceMapERC20(recipientsData);
    return merkleData
}


export { MerkleDistributorInfoERC1155, RecipientsDictFormatERC1155, RecipientsArrayFormatERC1155 } from "./merkle/parse-balance-map-erc1155"
export { MerkleDistributorInfoERC20, RecipientsDictFormatERC20, RecipientsArrayFormatERC20 } from "./merkle/parse-balance-map-erc20"
