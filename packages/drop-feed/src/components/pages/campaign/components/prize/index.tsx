import { FC } from 'react'
import {
  WidgetTitle,
  CampaignImage,
  CampaignTimer,
  CampaignWidget,
  TableRow,
  TableRowTitle,
  TableWithMargin,
  CampaignButton,
  TableRowValue
} from '../../styled-components'
import { useParams } from 'react-router-dom'

import { TPrize } from 'types'
import {
  TextLink
} from 'components/common'

type TProps = {
  prize: TPrize,
  date: string,
  image: string
}

const Tickets: FC<TProps> = ({
  prize,
  date,
  image
}) => {
  const dateUpdated = new Date(date);
  dateUpdated.setDate(dateUpdated.getDate() + 30)
  const { id } = useParams<{ id: string }>()
  return <CampaignWidget>
    <WidgetTitle>
      Information
    </WidgetTitle>
    <CampaignImage src={image} />
    <CampaignTimer finishDate={dateUpdated} />
    <TableWithMargin>
      <TableRow>
        <TableRowTitle>
          Collection
        </TableRowTitle>
        <TableRowValue>
          <TextLink href='https://google.com'>{prize.collection_name}</TextLink>
        </TableRowValue>
      </TableRow>
      {prize.token_id && <TableRow>
        <TableRowTitle>
          Token ID
        </TableRowTitle>
        <TableRowValue>
          <TextLink href='https://google.com'>{prize.token_id}</TextLink>
        </TableRowValue>
      </TableRow>}
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
    <CampaignButton
      appearance='action'
      title='View results'
      to={`/campaigns/${id}/result`}
    />
    <CampaignButton
      title='Keep me notified'
      onClick={() => {}}
    />
  </CampaignWidget>
}

export default Tickets