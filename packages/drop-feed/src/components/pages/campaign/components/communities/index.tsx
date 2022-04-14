import { FC } from 'react'
import { Title, Text, TextLink } from 'components/common'
import {
  Table,
  TableRowWithMargin,
  TableRowValue,
  CommunityUserpic,
  CampaignWidget,
  CampaignButton
} from '../../styled-components'
import {
  defineExplorerURL,
  shortenString
} from 'helpers'
import { TCommunities } from 'types'

type TProps = {
  communities: TCommunities,
  chain_id: number
}
const Communities: FC<TProps> = ({
  communities,
  chain_id
}) => {
  return <>
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
              /> {item.name}
            </TableRowValue>
            <TableRowValue>
              <TextLink href={`${defineExplorerURL(chain_id)}/${item.address}`}>
                {shortenString(item.address)}
              </TextLink>
            </TableRowValue>
          </TableRowWithMargin>
        })}
      </Table>
      <CampaignButton title='Check the full list of addresses' onClick={() => {}}/>
    </CampaignWidget>
  </>
}

export default Communities
