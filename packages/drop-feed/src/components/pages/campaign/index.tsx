import { FC } from 'react'
import { Title, Text, MainTitle } from 'components/common'
import { Tickets, Communities, Prize } from './components'
import {
  Content,
  RightColumn,
  LeftColumn,
  CampaignWidget,
  CampaignToDo,
  CampaignStatus,
  CampaignOwner,
  CampaignOwnerImage,
  CampaignStatusIndicator
} from './styled-components'
import { campaign } from 'configs/campaigns'
import { RootState } from 'data/store';
import { connect } from 'react-redux';

const mapStateToProps = ({
  user: {
    provider,
    address,
    chainId
  }
}: RootState) => ({
  provider,
  address,
  chainId
})

const todoData = [
  {
    title: 'Trade for 0.005 ETH via Ledger Live',
    id: 1,
    finished: true,
    buttonTitle: 'Trade',
    onClick: () => {}
  },
  {
    title: 'Share tweet',
    id: 2,
    finished: false,
    buttonTitle: 'Share',
    onClick: () => {}
  },
  {
    title: 'Mint raffle ticket',
    id: 3,
    finished: false,
    buttonTitle: 'Mint',
    onClick: () => {}
  }
]

type ReduxType = ReturnType<typeof mapStateToProps>



const Campaign: FC<ReduxType> = ({ address }) => {
  const {
    title,
    description,
    image,
    communities,
    owner,
    chain_id,
    prize,
    ticket,
    date
  } = campaign

  return <Content>
    <LeftColumn>
      <MainTitle>{title}</MainTitle>
      <CampaignStatus>
        <CampaignStatusIndicator status='active' />
        <CampaignOwner>
          <CampaignOwnerImage src={owner.logo} alt={owner.name} />
          {owner.name}
        </CampaignOwner>
      </CampaignStatus>
      <Text>{description}</Text>
      
      <Communities chain_id={chain_id} communities={communities}/>

      <Title>
        Ticket minter
      </Title>
      <Text>Complete tasks one-by-one to mint ticket and register for raffle</Text>
      <CampaignWidget>
        <CampaignToDo data={todoData} />
      </CampaignWidget>


      <Tickets
        ticket={ticket}
        chain_id={chain_id}
      />
    </LeftColumn>

    <RightColumn>
      <Prize
        date={date}
        prize={prize}
        image={image}
      />
    </RightColumn>
  </Content>
}

export default connect(mapStateToProps)(Campaign)