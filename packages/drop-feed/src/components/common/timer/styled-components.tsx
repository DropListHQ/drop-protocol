import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  background: ${props => props.theme.buttonGradient};
  align-items: center;
  justify-content: center;
  padding: 2px;
  max-width: 140px;
  border-radius: 14px;
`

export const Content = styled.div`
  padding: 4px 16px;
  display: flex;
  height: 24px;
  align-items: center;
  width: 100%;
  justify-content: center;
  background: ${props => props.theme.blankColor};
  border-radius: 14px;
`

export const Text = styled.p`
  font-size: 14px;
  font-weight: 700;
  margin-right: 8px;

  &:last-child {
    margin-right: 0px;
  }
`