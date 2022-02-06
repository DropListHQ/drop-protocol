import styled from 'styled-components'

interface IProps {
  className?: string
}

export const Wrapper = styled.div<IProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 12px 16px;
  background: ${props => props.theme.blankColor};
  border-radius: 8px;
  width: 100%;
  border: 1px solid ${props => props.theme.primaryBorderColor};
`

export const WrapperTitle = styled.h3`
  font-size: 12px;
  color: ${props => props.theme.noteTextColor};
  margin-bottom: 4px;
  text-align: center;
`


export const WrapperContent = styled.p`
  margin: 0;
  font-weight: 700;
  font-size: 34px;
  line-height: 40px;
  text-align: center;
  color: ${props => props.theme.primaryTextColor};
`