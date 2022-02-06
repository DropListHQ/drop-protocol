export type TItemERC1155 = {
  [recipient: string]: {
    tokenId: string,
    amount: string
  }
}

export type TItemERC721 = {
  [recipient: string]: {
    tokenId: string
  }
}

export type TItemERC20 = {
  [recipient: string]: {
    amount: string
  }
}

type TRecipientsData = TItemERC1155 | TItemERC721 | TItemERC20

export default TRecipientsData