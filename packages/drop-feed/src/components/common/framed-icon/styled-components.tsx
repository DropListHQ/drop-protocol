import styled from 'styled-components'

export const Container = styled.div`
  width: 88px;
  height: 88px;
  background: ${props => props.theme.blankColor};
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.15);
  border-radius: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Image = styled.img`
  
`