import styled from 'styled-components'
import { Widget, ToDo, Timer, Button, Userpic } from 'components/common'

export const Content = styled.div`
  display: flex;
`

export const RightColumn = styled.div`
  width: 300px;
`

export const LeftColumn = styled.div`
  flex: 1;
  padding-right: 20px;
`

export const CampaignWidget = styled(Widget)`
  margin-bottom: 24px;
  max-width: 100%;
`

export const CampaignWidgetWithFooter = styled(CampaignWidget)`
  padding-bottom: 0;
`

export const CampaignWidgetFooter = styled.div`
  border-top: 1px solid ${props => props.theme.primaryBorderColor};
  min-height: 68px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 -16px;
`

export const WidgetTitle = styled.h4`
  font-size: 16px;
  margin: 0 0 16px;
`

export const CampaignToDo = styled(ToDo)`
  margin-top: 0px;
`

export const CampaignImage = styled.img`
  border-radius: 8px;
  height: 210px;
  width: 100%;
  object-fit: cover;
  display: block;
`

export const CampaignTimer = styled(Timer)`
  margin: 0 auto;
  transform: translateY(-50%);
`

export const Table = styled.div`
  margin-bottom: 0px;
`

export const TableWithMargin = styled(Table)`
  margin-bottom: 30px;
`

export const TableRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  width: 100%;
  align-items: center;
`

export const TableRowWithMargin = styled(TableRow)`
  margin-bottom: 28px;
`
export const TableRowWithNoMargin = styled(TableRow)`
  margin-bottom: 0px;
`

export const TableRowTitle = styled.h4`
  font-size: 14px;
  margin: 0;
  font-weight: 700;
  color: ${props => props.theme.noteTextColor};
`

export const TableRowValue = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${props => props.theme.primaryTextColor};
`

export const TableRowTitleLarge = styled(TableRowTitle)`
  font-size: 16px;
  color: ${props => props.theme.primaryTextColor};
`

export const TableRowValueLarge = styled(TableRowValue)`
  font-size: 16px;
`

export const CampaignButton = styled(Button)`
  max-width: 100%;
  width: 100%;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0px;
  }
`

export const TableHeadTitle = styled(TableRowTitle)`
  font-size: 12px;
`

export const ParticipantImage = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 16px;
  margin-right: 8px;
  background: pink;
  display: inline-block;
  vertical-align: middle;
`

export const ParticipantLargeImage = styled(ParticipantImage)`
  width: 32px;
  height: 32px;
  border-radius: 32px;
  margin-right: 24px;
`

export const LoadMoreButton = styled(Button)`
  min-width: 126px;
`

export const CommunityUserpic = styled(Userpic)`
  vertical-align: bottom;
  margin-right: 10px;
`

export const TableButton = styled(Button)`
  width: 126px;
`
