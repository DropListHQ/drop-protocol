import React, { FC, ReactElement, useEffect } from 'react'
import DropSDK from '@drop-protocol/drop-sdk'
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
import { TCampaignStep } from 'types'
import { useHistory } from 'react-router-dom'

import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { Container } from './styled-components'
import { useParams } from 'react-router-dom'
import { Dispatch } from 'redux';
import * as dropAsyncActions from 'data/store/reducers/campaign/async-actions'
import * as dropActions from 'data/store/reducers/campaign/actions'
import { CampaignActions } from 'data/store/reducers/campaign/types'
import { TokenActions } from 'data/store/reducers/token/types'

const mapStateToProps = ({
  user: { address, provider, chainId, dropSDK },
}: RootState) => ({
  address,
  provider,
  chainId,
  dropSDK
})
const mapDispatcherToProps = (dispatch: Dispatch<CampaignActions> & Dispatch<TokenActions>) => {
  return {
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

type TDefineStep = (step: string) => ReactElement


const ClaimPage: FC<ReduxType> = ({
  address,
  chainId,
  provider,
  dropSDK
}) => {
  

  return <Page>
    <Container>
      сдфшьclaimingштп
    </Container>
  </Page>
}

export default connect(mapStateToProps, mapDispatcherToProps)(ClaimPage)
