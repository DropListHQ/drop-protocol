import styled from 'styled-components';
import {
  Input,
  Button,
  Textarea,
  DataBlock
} from 'components/common'

import { Link } from 'react-router-dom'

export const WidgetInput = styled(Input)`
`;

export const WidgetTextarea = styled(Textarea)`
  textarea {
    min-height: 420px;
  }
`

export const WidgetControls = styled.div`
  display: flex;
  width: 100%;
  gap: 18px;
  margin-top: 50px;
`

export const WidgetButton = styled(Button)`
  flex: 1;
`
export const WidgetDataSplit = styled.div`
  display: flex;
  width: 100%;
  gap: 16px;
`

export const WidgetDataBlock = styled(DataBlock)`
  flex: 1;
`

export const DoubleWidget = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
`

export const Title = styled.h3`
  font-size: 16px;
  margin: 0 0 24px;
  font-weight: 700;
`

export const Table = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 120px;
  grid-gap: 8px;
  margin-bottom: 36px;
`

export const TableItem = styled.div`
  border-radius: 8px;
  min-height: 24px;
  padding: 0px 8px;
  background: ${props => props.theme.blankColor};
  font-size: 14px;
  display: flex;
  align-items: center;
  line-height: 24px;

  &:nth-child(4n + 3) {
    background: ${props => props.theme.primaryColor};
  }
  

  &:nth-child(2n + 2) {
    background: ${props => props.theme.buttonDefaultColor};
    color: ${props => props.theme.secondaryTextColor};
    font-size: 12px;
    justify-content: space-between;
    
    text-align: center;
    cursor: pointer;
  }
`

export const TableWidget = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const TableItemImage = styled.img`
  object-fit: cover;
  width: 16px;
  height: 16px;
  border-radius: 16px;
  margin-right: 6px;
`

export const LinkAnchor = styled(Link)`
  font-size: 12px;
  font-weight: 700;
  color: ${props => props.theme.primaryHighlightColor};
  text-decoration: none;
  text-align: right;

  svg {
    transform: scale(-1, -1);
    margin-left: 4px;
  }
`