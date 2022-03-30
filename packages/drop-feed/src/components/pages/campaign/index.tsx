import { FC, useState } from 'react'
import { Title, Text, TextLink, MainTitle } from 'components/common'
import {
  Content,
  RightColumn,
  LeftColumn,
  CampaignWidget,
  WidgetTitle,
  CampaignToDo,
  CampaignImage,
  CampaignTimer,
  Table,
  TableRow,
  TableRowTitle,
  TableRowValue,
  CampaignButton,
  TableWithMargin,
  TableRowWithMargin,
  CommunityUserpic,
  TableButton,
  TableRowWithNoMargin
} from './styled-components'
import { campaign } from 'configs/campaigns'
import {
  defineExplorerURL, shortenString
} from 'helpers'
import { RootState } from 'data/store';
import { connect } from 'react-redux';

const mapStateToProps = ({ user: { provider, address, chainId } }: RootState) => ({ provider, address, chainId })

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

const date = new Date();

// add a day
date.setDate(date.getDate() + 30);

const Campaign: FC<ReduxType> = ({ address }) => {
  const {
    title,
    description,
    image,
    communities,
    owner,
    chain_id,
    campaign_address,
    token_type,
    ticket
  } = campaign

  const ticketsAmount = 1

  const defineTicketsContent = () => {
    if (!ticketsAmount) {
      return <Table>
        <TableRowWithNoMargin>
          <TableRowValue>
            You have no tickets yet. Mint or buy on OpenSea
          </TableRowValue>
          <TableRowValue>
            <TableButton
              title='Trade'
            />
          </TableRowValue>
        </TableRowWithNoMargin>
      </Table>
    }
    return <Table>
      <TableRow>
        <TableRowValue>
          Your Tickets / Total
        </TableRowValue>
        <TableRowValue>
          {ticketsAmount}/{ticket.total}
        </TableRowValue>
      </TableRow>

      <TableRow>
        <TableRowValue>
          Contract address
        </TableRowValue>
        <TableRowValue>
          <TextLink href={`${defineExplorerURL(chain_id)}/${ticket.token_address}`}>
            {shortenString(ticket.token_address)}
          </TextLink>
        </TableRowValue>
      </TableRow>

      <TableRow>
        <TableRowValue>
          Token Standard
        </TableRowValue>
        <TableRowValue>
          {ticket.type}
        </TableRowValue>
      </TableRow>
    </Table>
  }
  return <Content>
    <LeftColumn>
      <MainTitle>{title}</MainTitle>
      <Text>{description}</Text>
      
      <Title>
        Eligible communities
      </Title>
      <Text>To be eligible for the drop, you had to own one these NFTS by 31st May</Text>
      <CampaignWidget>
        <Table>
          {communities.map(item => {
            return <TableRowWithMargin>
              <TableRowValue>
                <CommunityUserpic
                  src={item.logo}
                  alt={item.address}
                />Bored Ape Yacht Club
              </TableRowValue>
              <TableRowValue>
                <TextLink href={`${defineExplorerURL(chain_id)}/${item.address}`}>
                  {shortenString(item.address)}
                </TextLink>
              </TableRowValue>
            </TableRowWithMargin>
          })}
        </Table>
        <CampaignButton title='Keep me notified' onClick={() => {}}/>
      </CampaignWidget>

      <Title>
        Ticket minter
      </Title>
      <Text>Complete tasks one-by-one to mint ticket and register for raffle</Text>
      <CampaignWidget>
        <CampaignToDo data={todoData} />
      </CampaignWidget>

      <Title>
        Ticket info
      </Title>
      <Text>Here is be displayed your tickets. Trade your tickets to increase your chance to win raffle</Text>
      <CampaignWidget>
        {defineTicketsContent()}
      </CampaignWidget>
    </LeftColumn>

    <RightColumn>
      <CampaignWidget>
        <WidgetTitle>
          Information
        </WidgetTitle>
        <CampaignImage src={image} />
        <CampaignTimer finishDate={date} />
        <TableWithMargin>
          <TableRow>
            <TableRowTitle>
              Collection
            </TableRowTitle>
            <TableRowValue>
              <TextLink href='https://google.com'>Cryptoadz</TextLink>
            </TableRowValue>
          </TableRow>
          <TableRow>
            <TableRowTitle>
              Token ID
            </TableRowTitle>
            <TableRowValue>
              <TextLink href='https://google.com'>3752</TextLink>
            </TableRowValue>
          </TableRow>
          <TableRow>
            <TableRowTitle>
              Price
            </TableRowTitle>
            <TableRowValue>
              1.432 ETH
            </TableRowValue>
          </TableRow>
          <TableRow>
            <TableRowTitle>
              Blockchain
            </TableRowTitle>
            <TableRowValue>
              Ethereum
            </TableRowValue>
          </TableRow>
        </TableWithMargin>
        <CampaignButton appearance='action' disabled title='View results' onClick={() => {}}/>
        <CampaignButton title='Keep me notified' onClick={() => {}}/>
      </CampaignWidget>
    </RightColumn>
  </Content>
}

export default connect(mapStateToProps)(Campaign)