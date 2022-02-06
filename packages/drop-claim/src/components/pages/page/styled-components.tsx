import styled, { css } from 'styled-components';

export const Page = styled.div`
  display: flex;
  height: 100%;
  background: ${props => props.theme.blankColor};
`;

export const MainContent = styled.div`
	flex: 1;
`;

type TContentProps = {
  noHeader?: boolean
}

export const Content = styled.main<TContentProps>`
  padding: 0px 20px 0;

  ${props => props.noHeader && css`
    padding: 24px 20px 0;
  `}
`
