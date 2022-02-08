import { Dispatch } from 'redux';
import * as actions from './actions';
import { UserActions } from './types';
import Web3Modal from "web3modal";
import { Web3Provider } from '@ethersproject/providers'
import WalletConnectProvider from "@walletconnect/web3-provider";

function sleep(timeout: number) {
  return new Promise((resolve) => setTimeout(() => resolve(true), timeout))
}
export async function addItemAsync(dispatch: Dispatch<UserActions>, item: string) {
  dispatch(actions.setLoading(true));
  await sleep(1000);
  dispatch(actions.setAddress(item));
  dispatch(actions.setLoading(false));
}

export async function connectWallet (dispatch: Dispatch<UserActions>) {
  const providerOptions = {
    // Example with injected providers
    injected: {
      display: {
        logo: "data:image/gif;base64,INSERT_BASE64_STRING",
        name: "Injected",
        description: "Connect with the provider in your Browser"
      },
      package: null
    },
    // Example with WalletConnect provider
    walletconnect: {
      display: {
        name: "Mobile",
        description: "Scan qrcode with your mobile wallet"
      },
      package: WalletConnectProvider,
      options: {
        infuraId: "620c738fbe1843a18f47ada0e60e738a" // required
      }
    }
  };
  const web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    providerOptions // required
  })
  const provider = await web3Modal.connect();
  const providerWeb3 = new Web3Provider(provider)
  
  let { chainId } = await providerWeb3.getNetwork()
  if (chainId !== 4) {
    return alert('Currently only Rinkeby is available.')
  }
  
  const accounts = await providerWeb3.listAccounts()
  const address = accounts[0] && accounts[0].toLowerCase()
  dispatch(actions.setProvider(providerWeb3))
  dispatch(actions.setAddress(address))
  dispatch(actions.setChainId(chainId))

  provider.on("accountsChanged", (accounts: string[]) => {
    if (chainId !== 4) { return }
    const address = accounts[0] && accounts[0].toLowerCase()
    dispatch(actions.setAddress(address))
  });
  
  // Subscribe to chainId change
  provider.on("chainChanged", (chainId: string) => {
    let chainIdConverted = parseInt(chainId, 16);
    if (chainIdConverted !== 4) {
      return alert('Currently only Rinkeby is available.')
    }
    dispatch(actions.setChainId(chainIdConverted))
  });
  

}