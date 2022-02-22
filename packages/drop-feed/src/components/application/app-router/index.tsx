import React, { useEffect, FC } from 'react'
import { Route, Switch, HashRouter } from 'react-router-dom'
// import { functionalActions } from 'decorators'
import ProtectedRoute from './protected-route'


import {
  NotFound,
  Page,
  Campaigns,
  CampaignsCreate,
  CampaignsDetails,
  Communities
//   NotFound,
//   ProtectedRoute,
//   Authorize
} from 'components/pages'

import { Dispatch } from 'redux';
import * as asyncActions from 'data/store/reducers/user/async-actions'
import { UserActions } from 'data/store/reducers/user/types'
import { connect } from 'react-redux';
import { RootState } from 'data/store';
import { CommunitiesActions } from 'data/store/reducers/communities/types'
import * as communityAsyncActions from 'data/store/reducers/communities/async-actions'
import communities from 'configs/communities'


const mapDispatcherToProps = (dispatch: Dispatch<UserActions | CommunitiesActions> ) => {
  return {
    connectWallet: () => asyncActions.connectWallet(dispatch),
    getCommunityData: (communities: string[]) => communityAsyncActions.getCommunityData(dispatch, communities)
  }
}

const mapStateToProps = ({ user: { provider, address } }: RootState) => ({ provider, address })
type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const AppRouter: FC<ReduxType> = ({ address, connectWallet, getCommunityData }) => {
  useEffect(() => {
    getCommunityData(Object.keys(communities))
  }, [])

  return <HashRouter>
    <Page>
      <Switch>

        <ProtectedRoute
          path='/campaigns/new'
          exact={true}
          loggedIn={Boolean(address)}
          component={CampaignsCreate}
        />
        <ProtectedRoute
          path='/campaigns/:id'
          exact={true}
          loggedIn={Boolean(address)}
          component={CampaignsDetails}
        />
        <Route path='/communities' exact={true} render={props => <Communities
          {...props}
        />} />
        <Route path='/' exact={true} render={props => <Campaigns
          connectWallet={connectWallet}
          {...props}
        />} />
        <Route path='*' exact={true} render={props => <NotFound
          {...props}
        />} />
      </Switch>
    </Page>
  </HashRouter>
}

export default connect(mapStateToProps, mapDispatcherToProps)(AppRouter)