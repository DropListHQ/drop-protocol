import React, { useEffect, FC } from 'react'
import { Route, Switch, Router } from 'react-router-dom'
// import { functionalActions } from 'decorators'
import { Web3Provider } from '@ethersproject/providers'
import { history } from 'data/store'
import { ScreenLoader } from 'components/common'
import {
  NotFound,
  ClaimPage,
  CampaignFinished
//   NotFound,
//   ProtectedRoute,
//   Authorize
} from 'components/pages'
import { Dispatch } from 'redux';
import * as actions from 'data/store/reducers/user/actions'
import { UserActions } from 'data/store/reducers/user/types'
import { connect } from 'react-redux';
import { RootState } from 'data/store';



import { InjectedConnector } from '@web3-react/injected-connector'
import { useWeb3React } from '@web3-react/core'

const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] })


const mapDispatcherToProps = (dispatch: Dispatch<UserActions>) => {
  return {
      setAddress: (address: string) => dispatch(actions.setAddress(address)),
      setProvider: (provider: any) => dispatch(actions.setProvider(provider)),
      setChainId: (chainId: number) => dispatch(actions.setChainId(chainId))
  }
}
const mapStateToProps = ({ user: { provider, address, chainId } }: RootState) => ({ provider, address, chainId })

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const AppRouter: FC<ReduxType> = ({ setAddress, setProvider, setChainId, provider, address }) => {
  const context = useWeb3React<Web3Provider>()
  const { library, activate, active, error, chainId, account } = context
  console.log({ active, error })

  useEffect(() => {
    if (provider) { return }
    async function defineProvider () {
      // const providerOptions = {
      //   /* See Provider Options Section */
      // };
      // const web3Modal = new Web3Modal({
      //   network: "rinkeby", // optional
      //   cacheProvider: true, // optional
      //   providerOptions // required
      // })
      
      try {
        if (error) { throw new Error('Error occured')}
        activate(injected)
        // const provider = await web3Modal.connect();
        // provider.on("accountsChanged", (accounts: string[]) => {
        //   window.location.reload()
        // })
        // provider.on("chainChanged", (chainId: number) => {
        //   window.location.reload()
        // });
        
        // const providerWeb3 = new Web3Provider(provider)
        if (!library) { return }
        const { chainId } = await library.getNetwork()
        const accounts = await library.listAccounts()
        setAddress(accounts[0])
        setChainId(chainId)
        setProvider(library)
      } catch (err) {
        console.error(err)
        setProvider(null)
      }
    }
    
    
    defineProvider()
  }, [active, error])

  useEffect(() => {
    if (!library) { return }
    const reload = async () => {
      const { chainId } = await library.getNetwork()
      const accounts = await library.listAccounts()
      setAddress(accounts[0])
      setChainId(chainId)
      setProvider(library)
    }
    reload()
  }, [chainId, account, library])

  

  if (!active && !error) {
    return <ScreenLoader />
  }

  return <Router history={history}>
    <Switch>
      <Route path='/claim/:ipfs'><ClaimPage /></Route>
      <Route path='/campaign-finished'><CampaignFinished /></Route>
      <Route path='*'><NotFound /></Route>
    </Switch>
  </Router>
}

export default connect(mapStateToProps, mapDispatcherToProps)(AppRouter)