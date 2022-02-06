import styled from 'styled-components';

export const FooterComponent = styled.footer`
  display: flex;
  text-align: center;
  font-size: 12px;
  line-height: 16px;
  height: 48px;
  padding: 0 8px;
  box-sizing: border-box;
  align-items: center;
  font-weight: 400;
  justify-content: center;
  font-weight: 700;
  color: ${props => props.theme.primaryTextColor};
  span {
    margin: 0 6px;
  }
`