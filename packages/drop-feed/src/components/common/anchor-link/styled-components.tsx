import { Link } from 'react-router-dom'
import styled from 'styled-components';

export const AnchorLink = styled(Link)`
  font-size: 12px;
  font-weight: 700;
  color: ${props => props.theme.primaryHighlightColor};
  text-decoration: none;
  text-align: right;
  width: 100%;
  display: block;

  svg {
    transform: scale(-1, -1);
    margin-left: 4px;
  }
`