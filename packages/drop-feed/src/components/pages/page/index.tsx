import React, { FC } from 'react'
// import { functionalActions } from 'decorators'
import { Header, Footer, Container, ConnectorPopup } from 'components/common'
import { Page, MainContent, Content } from './styled-components'
import { ThemeProvider } from 'styled-components'
import themes from 'themes'
import { RootState } from 'data/store';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as userActions from 'data/store/reducers/user/actions'
import { UserActions } from 'data/store/reducers/user/types'


const mapStateToProps = ({
  user: {
    showConnectorPopup
  }
}: RootState) => ({
  showConnectorPopup
})

const mapDispatcherToProps = (dispatch: Dispatch<UserActions>) => {
  return {
		closeConnectorPopup: () => dispatch(userActions.toggleConnectorPopup(false)),
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const PageComponent: FC<ReduxType> = ({
  children,
  showConnectorPopup,
  closeConnectorPopup
}) => {
  return (
    <ThemeProvider theme={themes.light}>
      <Page>
        {showConnectorPopup && <ConnectorPopup
          onClose={closeConnectorPopup}
        />}
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

export default connect(mapStateToProps, mapDispatcherToProps)(PageComponent);
