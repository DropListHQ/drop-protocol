import styled from 'styled-components';

export const LaunchButton = styled.button`
  background: ${props => props.theme.buttonGradient};
  background-size: 200%;
  background-position: left top;
  border-radius: 8px;
  cursor: pointer;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  height: 24px;
  border: none;
  transition: background-position .3s;
  color: ${props => props.theme.secondaryTextColor};
  &:hover {
    background-position: right top;
  }
  &:active {
    background-position: center center;
  }
`