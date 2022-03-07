import React, { FC } from 'react'
// import { functionalActions } from 'decorators'
import { Header, Footer, Container } from 'components/common'
import { Page, MainContent, Content } from './styled-components'
import { ThemeProvider } from 'styled-components'
import themes from 'themes'

interface PageProps {
  account?: string,
  chainId?: number
}

const PageComponent: FC<PageProps> = ({ children, account, chainId }) => {
  
  return (
    <ThemeProvider theme={themes.light}>
      <Page>
        <MainContent>
          <Header />
          <Content>
            <Container>
              {children}
            </Container>
          </Content>
          <Footer />
        </MainContent>
      </Page>
    </ThemeProvider>
  );
};

export default PageComponent;
