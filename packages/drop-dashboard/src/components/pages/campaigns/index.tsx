import React, { FC } from 'react'
import { Campaign, Title, CommunityWidget, AnchorLink } from 'components/common'
// import { connect, ConnectedProps } from 'react-redux'
import { Campaigns } from './styled-components'
import { RootState } from 'data/store';
import { connect } from 'react-redux';
import { Container, Text } from './styled-components'
import Icons from 'icons';
import { useHistory } from 'react-router-dom'
import * as communitiesAsyncActions from 'data/store/reducers/communities/async-actions'
import { CommunitiesActions } from 'data/store/reducers/communities/types'
import { Dispatch } from 'redux';
import communities from 'configs/communities'
type TProps = {
  connectWallet: () => void
}

interface INameToValueMap {
  [key: string]: any;
}

const mapStateToProps = ({
  drops: { retroDrops },
  user: { address },
  communities: { communities }
}: RootState) => ({
  retroDrops,
  address,
  loadedCommunities: communities
})

// const getOwnersData

const mapDispatcherToProps = (dispatch: Dispatch<CommunitiesActions>) => {
  return {
    getOwnersData: (contract: string) => communitiesAsyncActions.getOwnersData(dispatch, contract)
  }
}

type ReduxType = ReturnType<typeof mapStateToProps>  & ReturnType<typeof mapDispatcherToProps>

const CampaignsPage: FC<ReduxType & TProps> = ({ retroDrops, address, connectWallet, loadedCommunities, getOwnersData }) => {
  const currentCampaigns = retroDrops.filter(item => item.address === address)
  const history = useHistory()
  return <div>
    {currentCampaigns.length > 0 && <Container>
      <Title>Current Campaigns</Title>
      <Campaigns>
        {currentCampaigns.map(item => {
          return <Campaign
            title={item.title}
            status={item.status || 'active'}
            image={item.logoURL}
            id={item.ipfsHash}
            key={item.ipfsHash}
          />
        })}
      </Campaigns>
    </Container>}
    <Container>
      <Title>New Campaign</Title>
      <Text>Choose the community you would like to drop your tokens to, and upload your custom set of addresses via .csv file</Text>
      <Campaigns>
        <CommunityWidget
          title='Custom community'
          description='Provide addresses via .csv file'
          inverted
          buttonTitle={!address ? 'Connect wallet and start' : 'Start'}
          action={() => {
            address ? history.push('/campaigns/new') : connectWallet()
          }}
          icon={<Icons.LinkdropWhiteLogo />}
        />
        {loadedCommunities.slice(0, 3).map((item: INameToValueMap) => {
          const image = communities[item.id]
          return <CommunityWidget
            title={item.name || 'Untitled'}
            key={item.id}
            description={`${item.nftOwners.length} holders`}
            buttonTitle='Download .csv'
            action={() => {
              // console.log('hello')
              getOwnersData(item.id)
            }}
            image={image.logo}
          />
        })}
      </Campaigns>
      {loadedCommunities.length > 0 && <AnchorLink href='/communities'>View all communities <Icons.GoBackIcon /></AnchorLink>}
    </Container>
  </div>
}

export default connect(mapStateToProps, mapDispatcherToProps)(CampaignsPage)

