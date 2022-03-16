import { FC, useState } from 'react'
import { Title, Drop, Text } from 'components/common'
import { Container } from './styled-components'
import DropImage1 from 'images/1.png'
import DropImage2 from 'images/2.png'
import DropImage3 from 'images/3.png'
import { connect } from 'react-redux';
import { RootState } from 'data/store';
import * as asyncUserActions from 'data/store/reducers/user/async-actions'
import { UserActions } from 'data/store/reducers/user/types'
import {
  Filters,
  CommunityFilter,
  Filter,
  MainTitle,
  Content,
  MainInfo,
  Aside,
  Buttons,
  PageButton
} from './styled-components'
import { TDropType } from 'types'
import { Dispatch } from 'redux'

const communities = [
  { value: 1, label: 'Bored Ape Yacht Club' },
  { value: 2, label: 'Cryptoadz' },
  { value: 3, label: 'CryptoDickButts' },
  { value: 4, label: 'Cryptopunks' }
]

const networks = [
  { value: 1, label: 'Mainnet' },
  { value: 2, label: 'Rinkeby' },
  { value: 3, label: 'Polygon' }
]

const types = [
  { value: 'erc20', label: 'ERC20' },
  { value: 'erc721', label: 'ERC721' },
  { value: 'erc1155', label: 'ERC1155' }
]

const eventDate = new Date(1646222887038)
eventDate.setDate(eventDate.getDate() + 1)

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

const mapStateToProps = ({ user: { provider, address } }: RootState) => ({ provider, address })

const mapDispatcherToProps = (dispatch: Dispatch<UserActions>) => {
  return {
    connectWallet: () => asyncUserActions.connectWallet(dispatch),
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const Feed: FC<ReduxType> = ({ address, connectWallet }) => {
  const [ comunity, setCommunity ] = useState<string | number | null>(1)
  const [ network, setNetwork ] = useState<string | number | null>(1)
  const [ type, setType ] = useState<TDropType | null>(null)
  if (!address) {
    return <>
      <Content>
        <MainInfo>
          <MainTitle>Welcome<br />to DropList Alpha</MainTitle>
          <Text>
            Welcome to DropList alpha. This is a very first launch of DropList with a collaboration of CRYPTOMANGA community.
          </Text>
          <Text>
            DropList is a dapp that provides tools to distribute tokens to crypto communities and NFT owners.
          </Text>
          <Text>
            Connect wallet to see drops available for your wallet.
          </Text>
          <Text>
            Join telegram bot to get notifications when new drops for your wallet are available.
          </Text>
          <Buttons>
            <PageButton title='Learn more' href='https://google.com' target='_blank' />
            <PageButton title='Notify me' href='https://google.com' target='_blank' />
            <PageButton appearance='action' title='Let’s go' onClick={() => { connectWallet() }} />
          </Buttons>
        </MainInfo>
        <Aside>
          aside
        </Aside>
      </Content>
    </>
  }
  return <>
    <Title>Feed</Title>
    <Filters>
      <CommunityFilter
        value={comunity}
        onChange={value => setCommunity(value)}
        options={communities}
        placeholder='Community'
      />
      <Filter
        options={networks}
        value={network}
        onChange={value => setNetwork(value)}
        placeholder='Network'
      />
      <Filter
        options={types}
        value={type}
        onChange={value => setType(value)}
        placeholder='Token'
      />
    </Filters>
    <Container>
      {data.map(item => <Drop {...item} type='erc721' address={address} />)}
    </Container>
  </>
}

export default connect(mapStateToProps, mapDispatcherToProps)(Feed)
