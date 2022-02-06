import React, { FC } from 'react'
import AppRouter from '../app-router/index'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

const RouterProvider:FC = () => {
  return <Web3ReactProvider getLibrary={getLibrary}>
    <AppRouter />
  </Web3ReactProvider>
}

export default RouterProvider