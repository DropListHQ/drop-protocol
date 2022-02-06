import React, { FC, ReactElement, useEffect } from 'react'

import InitialScreen from './initial-screen'
import ChangeNetwork from './change-network'
import NotAllowedForClaim from './not-allowed-for-claim'
import ClaimingFinished from './claiming-finished'
import ClaimingProcess from './claiming-process'
import CheckEligibility from './check-eligibility'
import SetConnector from './set-connector'
import NoTokensLeft from './no-tokens-left'
import { ScreenLoader } from 'components/common'
import Page from '../page'
import { TDropStep } from 'types'
import { useHistory } from 'react-router-dom'

import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { Container } from './styled-components'
import { useParams } from 'react-router-dom'
import { Dispatch } from 'redux';
import * as dropAsyncActions from 'data/store/reducers/drop/async-actions'
import * as dropActions from 'data/store/reducers/drop/actions'
import { DropActions } from 'data/store/reducers/drop/types'
import { TokenActions } from 'data/store/reducers/token/types'

const mapStateToProps = ({
  user: { address, provider, chainId },
  drop: { step },
}: RootState) => ({
  address,
  step,
  provider,
  chainId,
})
const mapDispatcherToProps = (dispatch: Dispatch<DropActions> & Dispatch<TokenActions>) => {
  return {
      getData: (
        provider: any,
        ipfs: string,
        chainId: number,
        address: string,
        history: any
      ) => dropAsyncActions.getInitialData(dispatch, provider, ipfs, chainId, address),
      setStep: (step: TDropStep) => dispatch(dropActions.setStep(step))
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

type TDefineStep = (step: string) => ReactElement

const defineCurrentScreen: TDefineStep = step => {
  switch (step) {
    case 'initial':
      return <InitialScreen />
    case 'change_network':
      return <ChangeNetwork />
    case 'not_allowed':
      return <NotAllowedForClaim />
    case 'claiming_process':
      return <ClaimingProcess />
    case 'claiming_finished':
      return <ClaimingFinished />
    case 'check_eligibility':
      return <CheckEligibility />
    case 'set_connector':
      return <SetConnector />
    case 'no_tokens_left':
      return <NoTokensLeft />
    default:
      return <ScreenLoader />
  }
}

const ClaimPage: FC<ReduxType> = ({
  step,
  getData,
  address,
  chainId,
  provider,
  setStep
}) => {
  const { ipfs }: { ipfs: string } = useParams()
  const screen = defineCurrentScreen(step)
  const history = useHistory()
  useEffect(() => {
    if (provider === null) { setStep('set_connector') }
    if (chainId && provider) {
      getData(provider, ipfs, chainId, address, history)
    }
  }, [provider, address, chainId])
  
  return <Page noHeader={step === 'check_eligibility'}>
    <Container>
      {screen}
    </Container> 
  </Page>
}

export default connect(mapStateToProps, mapDispatcherToProps)(ClaimPage)
