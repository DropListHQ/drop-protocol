import { FC } from 'react'
import {
  Table,
  TableRowWithNoMargin,
  TableRowValue,
  TableButton,
  TableRow,
  CampaignButton,
  CampaignWidget
} from '../../styled-components'
import { TTicket } from 'types'
import { TextLink, Title, Text } from 'components/common'
import { defineExplorerURL, shortenString } from 'helpers'

const ticketsAmount = 1

type TProps = {
  ticket: TTicket
  chain_id: number
}

const Tickets: FC<TProps> = ({
  ticket,
  chain_id
}) => {
  const renderContent = () => {
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
    return <>
      <Table>
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
      <CampaignButton title='Trade on OpenSea' onClick={() => {}}/>
    </>
  }
  return <>
    <Title>
      Ticket info
    </Title>
    <Text>Here is be displayed your tickets. Trade your tickets to increase your chance to win raffle</Text>
    <CampaignWidget>
      {renderContent()}
    </CampaignWidget>
  </>
}

export default Tickets