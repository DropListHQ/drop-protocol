import { TRetroDropType } from 'types'

type TContracts = {
  [networkId: string | number]: {
    [key in TRetroDropType]: string
  } & {
    factory: string;
  }
}

const contracts: TContracts = {
  4: {
    factory: '0x236057383d390DEBC28EAd467BAD3804cA3f6B29',
    erc721: '0x43FE7F2D3Aa1211D3Be827150F2724DB6E06e683',
    erc20: '0x209E02C7386B8864400E73f5DbFF1c3f43F15EF3',
    erc1155: '0xEC83D005C762B9Eca5D719354c4d6E1502e757bC'
  }
}

export default contracts