import parseBalanceMap, { MerkleDistributorInfo } from "./merkle/parse-balance-map"


// RecipientData should be provided in the the following format: 
export type RecipientsDataFormat = {
    [account: string]: {
        amount: number | string,
        tokenId: number | string,
        maxSupply: number
    }
}

export const buildMerkleTreeERC1155 = (recipientsData: RecipientsDataFormat): MerkleDistributorInfo => {
    const merkleData = parseBalanceMap(recipientsData);
    return merkleData
}
