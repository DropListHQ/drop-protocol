import React, { FC, ReactElement } from 'react'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { shortenString, defineNetworkName } from 'helpers'
import { Title, ScreenButton, TokenImageHuge } from './styled-components'
import { TDropType } from 'types'
import { ethers, utils } from 'ethers'

const mapStateToProps = ({
  drop: { hash, chainId, type, tokenId, tokenAddress, logoURL, amount },
  user: { address },
  token: { image, name, decimals }
}: RootState) => ({
  address,
  image, name,
  chainId,
  tokenId, tokenAddress,
  logoURL,
  amount,
  type,
  decimals
})
type ReduxType = ReturnType<typeof mapStateToProps>
type TDefineTitle = (tokenName: string, address: string, type: TDropType | null, amount: string | null, decimals: number) => ReactElement
type TDefineOpenseaUrl = ({ chainId, tokenId, tokenAddress }: { chainId: number, tokenId: string, tokenAddress: string }) => string


const defineOpenseaURL: TDefineOpenseaUrl = ({ chainId, tokenId, tokenAddress }) => {
  const networkName = defineNetworkName(chainId)
  if (networkName === 'mainnet') {
    return `https://opensea.io/assets/${tokenAddress}/${tokenId}`
  }
  if (networkName === 'matic') {
    return `https://opensea.io/assets/matic/${tokenAddress}/${tokenId}`
  }
  return `https://testnets.opensea.io/assets/${networkName}/${tokenAddress}/${tokenId}`
}

const defineTitle: TDefineTitle = (tokenName, address, type, amount, decimals) => {
  const defineAmount = () => {
    if (!type || !amount) return null
    if (type === 'erc721') { return null }
    if (type === 'erc1155') {
      return amount
    }
    return utils.formatUnits(amount, decimals)
  }
  if (address) {
    return <Title>Congrats! {defineAmount()} <strong>{tokenName}</strong> has been claimed 🔥 to address: <span>{address}</span> </Title>
  }
  return <Title>{defineAmount()} <strong>{tokenName}</strong> has been claimed</Title>
}

const ClaimingFinished: FC<ReduxType> = ({ image, amount, decimals, type, name, address, chainId, tokenId, tokenAddress, logoURL }) => {
  const title = defineTitle(name, shortenString(address), type, amount, decimals)
  return <>
    {image && <TokenImageHuge
      src={image}
      alt={name}
    />}
    {title}
    {chainId && tokenId && tokenAddress && <ScreenButton
      title='View NFT on OpenSea'
      onClick={() => {
        window.open(defineOpenseaURL({
          chainId,
          tokenId,
          tokenAddress
        }))
      }}
    />}
  </>
}

export default connect(mapStateToProps)(ClaimingFinished)