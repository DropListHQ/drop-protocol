import React, { FC } from 'react'
// import { functionalActions } from 'decorators'
import { Header, Footer } from 'components/common'
// @ts-ignore
import { Page, MainContent, Content } from './styled-components.tsx'
import { ThemeProvider } from 'styled-components'
import themes from 'themes'
import { Scrollbar } from "react-scrollbars-custom";
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import Icon from 'icons'
interface PageProps {
  account?: string,
  chainId?: number,
  children: React.ReactNode,
  noHeader?: boolean
}
const mapStateToProps = ({
  drop: { step },
  user: { address }
}: RootState) => ({
  step,
  address
})
type ReduxType = ReturnType<typeof mapStateToProps>

type IDefineTitle = (step: string) => string | React.ReactNode
const defineTitle: IDefineTitle = step => {
  if (step === 'claiming_finished') { return <><Icon.DroplistLogo />DropList</> }
  return ''
  if (step === 'claiming_process' || step ===  'set_connector') { return '' }
  if (step === 'check_eligibility') { return 'Check eligibility' }
  return '🔥 Get token 🔥'
}

const PageComponent: FC<PageProps & ReduxType> = ({ children, step, noHeader = false, address }) => {
  const contentHeight = noHeader ? 'calc(100vh - 72px)' : 'calc(100vh - 68px - 48px)'
  return (
    <ThemeProvider theme={themes.light}>
      <Page>
        <MainContent>
          {!noHeader && <Header
            title={defineTitle(step)}
            address={address}
          />}
          <Content noHeader={noHeader}>
            <Scrollbar style={{ width: '100%', height: contentHeight }}>
              {children}
            </Scrollbar>
          </Content>
          <Footer />
        </MainContent>
      </Page>
    </ThemeProvider>
  );
};


export default connect(mapStateToProps)(PageComponent)
