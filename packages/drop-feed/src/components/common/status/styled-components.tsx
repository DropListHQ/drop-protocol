import styled, { css } from 'styled-components'
import { TProps } from './types'


export const StatusWrapper = styled.div<TProps>`
  height: 24px;
  font-size: 14px;
  font-weight: 700;
  border-radius: 18px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.secondaryTextColor};
  width: fit-content;

  ${props => props.status === 'active' && css`
    background-color: ${props.theme.statusSuccessColor};
  `}
`