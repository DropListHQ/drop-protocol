import { FC, ReactNode } from 'react'
import { Title, Drop, Text, TextLink } from 'components/common'
import { Container } from './styled-components'
import DropImage1 from 'images/1.png'
import DropImage2 from 'images/2.png'
import DropImage3 from 'images/3.png'
import { shortenString } from 'helpers'
import { connect } from 'react-redux';
import { RootState } from 'data/store';

const mapStateToProps = ({ user: { provider, address } }: RootState) => ({ provider, address })

const data = [
  {
    title: 'Temple of Metaverse NFT Drop, Temple of Metaverse NFT Drop',
    image: DropImage1,
    id: '0x59cb333f6c5f71f119ca38d93b2f50cc85888e2f22d4af07494c0f88300fda9f',
    description: 'Claim NFT and enter to the Temple, a web3 game by KryptoChurch where you grow your own Universe using simple mathmatical set of rules',
    chainId: 1,
    type: 'erc1155'
  }, {
    title: 'Ledger Nano NFT',
    image: DropImage2,
    id: '0xa5c71bd6e36fd95f2a2b1ee2d553902595e5d17caca0687735979d00a6557733',
    description: 'This NFT gives an access to claim your free LEDGER. Only for CRYPTOPUNKS',
    chainId: 1,
    type: 'erc1155'
  }, {
    title: 'StockX by Nike',
    image: DropImage3,
    id: '0x31e14ad3949784a22f48a668f5a066f0866c3ef08595829018d51187660a204a',
    description: 'Claim NFT drop and enter raffle orginized by Nike.',
    chainId: 1,
    type: 'erc1155'
  }
]

type ReduxType = ReturnType<typeof mapStateToProps>

type TDefineTitle = (address: string | undefined) => ReactNode

const renderTexts: TDefineTitle = (address) => {
  if (!address) {
    return <Text>
      Connect wallet to see available drops
    </Text>
  }
  return <>
     <Text>
      Availiable drops for <span>{shortenString(address)}</span> are here.
    </Text>
    <Text>
      Subscribe for <TextLink href='https://google.com'>Telegram Bot</TextLink> and we will notify you when there are drops for you.
    </Text>
  </>
}

const Feed: FC<ReduxType> = ({ address }) => {
  return <>
    <Title>Feed</Title>
    {renderTexts(address)}
    <Container>
      {data.map(item => <Drop {...item} type='erc721' address={address} />)}
    </Container>
  </>
}

export default connect(mapStateToProps)(Feed)
