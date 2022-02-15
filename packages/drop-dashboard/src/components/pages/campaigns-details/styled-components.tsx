import styled from 'styled-components'
import { InfoBlock, Widget, DataBlock } from 'components/common'


export const LinkContainer = styled.div`
  padding: 16px 16px 36px;
  max-width: 460px;
  background: ${props => props.theme.blankColor};
  border-radius: 8px;
  border: 1px solid ${props => props.theme.primaryBorderColor};
`

export const InfoBlockStyled = styled(InfoBlock)`
  max-width: 220px;
  margin-bottom: 8px;
  margin-right: 20px;

  &:last-child {
    margin-right: 0px;
  }
`

export const WidgetDataBlock = styled(DataBlock)`
  flex: 1;
`

export const Description = styled.div`
  display: flex;
  align-items: flex-start;
`

export const WidgetContainer = styled(Widget)`
  flex: 1;
  margin-right: 20px;
`

export const WidgetDataSplit = styled.div`
  display: flex;
  width: 100%;
  gap: 16px;
`

export const InfoBlockContainer = styled.div`
  display: flex;
`

export const Link = styled.div`
  padding: 0px;
  width: 100%;
  border-radius: 8px;
  height: 44px;
  border: 1px solid ${props => props.theme.primaryBorderColor};
  font-size: 16px;
  color: ${props => props.theme.primaryTextColor};
  padding: 0px 16px;
  justify-content: space-between;
  display: flex;
  align-items: center;
`

export const LinkValue = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
`

export const LinkTitle = styled.h3`
  color: ${props => props.theme.primaryTextColor};
  font-weight: 700;
  font-size: 12px;
  margin: 0px 0px 4px;
`