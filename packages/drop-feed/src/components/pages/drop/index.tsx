import { FC } from 'react'
import { Title, Text, TextLink } from 'components/common'
import {
  Content,
  RightColumn,
  LeftColumn,
  DropWidget,
  WidgetTitle,
  DropToDo,
  DropImage,
  DropTimer,
  Table,
  TableRow,
  TableRowTitle,
  TableRowValue,
  DropButton
} from './styled-components'
import DropImage1 from 'images/1.png'
import {
  defineExplorerURL, shortenString
} from 'helpers'
import { RootState } from 'data/store';
import { connect } from 'react-redux';

const mapStateToProps = ({ user: { provider, address, chainId } }: RootState) => ({ provider, address, chainId })

const todoData = [
  { title: 'Owning an NFT from the list of eligible communities', id: 1, active: false },
  { title: 'Sign a message to participate', id: 2, active: true },
  { title: 'Claim drop', id: 3, active: false }
]
type ReduxType = ReturnType<typeof mapStateToProps>

const date = new Date();

// add a day
date.setDate(date.getDate() + 30);

const Drop: FC<ReduxType> = ({ address, chainId }) => {
  return <>
    <Title>Ape with me</Title>
    <Content>
      <LeftColumn>
        <Text>“Ape with me” raffle organized by Ladger specially for BAYC owners. The main prize is a collectible Ledger Nano S with engraved Ape of a winner.</Text>
        <Text>To participate in this raffle follow an action sheet. Date of drop and result will be held on March 4th</Text>
        <DropWidget>
          <Title>
            Action sheet
          </Title>
          <DropToDo data={todoData} />
        </DropWidget>
        <DropWidget>
          <WidgetTitle>
            Participants
          </WidgetTitle>
        </DropWidget>
      </LeftColumn>
      <RightColumn>
        <DropWidget>
            <WidgetTitle>
              Information
            </WidgetTitle>
            <DropImage src={DropImage1} />
            <DropTimer finishDate={date} />
            <Table>
              <TableRow>
                <TableRowTitle>
                  Drop by
                </TableRowTitle>
                <TableRowValue>
                  Ledger Inc.
                </TableRowValue>
              </TableRow>
              <TableRow>
                <TableRowTitle>
                  Token address:
                </TableRowTitle>
                <TableRowValue>
                  {chainId && <TextLink target='_blank' href={`${defineExplorerURL(chainId)}/address/${address}`}>{shortenString(address)}</TextLink>}
                </TableRowValue>
              </TableRow>
              <TableRow>
                <TableRowTitle>
                  Network
                </TableRowTitle>
                <TableRowValue>
                  Mainnet
                </TableRowValue>
              </TableRow>
              <TableRow>
                <TableRowTitle>
                  Type
                </TableRowTitle>
                <TableRowValue>
                  1155
                </TableRowValue>
              </TableRow>
              <TableRow>
                <TableRowTitle>
                  Total amount
                </TableRowTitle>
                <TableRowValue>
                  1000
                </TableRowValue>
              </TableRow>
            </Table>
            <DropButton appearance='action' title='Sign to participate' onClick={() => {}}/>
          </DropWidget>
          <DropWidget>
            <WidgetTitle>
              LootBox
            </WidgetTitle>
          </DropWidget>
      </RightColumn>
    </Content>
    
  </>
}

export default connect(mapStateToProps)(Drop)