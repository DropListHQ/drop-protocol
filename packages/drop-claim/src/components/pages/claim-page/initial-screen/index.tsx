import React, { FC } from 'react'
import { TokenImage, Widget } from 'components/common'
import { Title, ScreenButton, TextComponent, IconComponent, Description } from './styled-components'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import DropSDK from '@drop-protocol/drop-sdk'
import { DropActions } from 'data/store/reducers/drop/types'
import { TokenActions } from 'data/store/reducers/token/types'
import * as dropAsyncActions from 'data/store/reducers/drop/async-actions'
import { Dispatch } from 'redux';
import * as dropActions from 'data/store/reducers/drop/actions'
import { TDropStep } from 'types'

const mapStateToProps = ({
  token: { name, image },
  user: { address, provider, dropSDK },
  drop: { proof, tokenId, amount, dropAddress, index, allowedAddressList, logoURL, description, title, type }
}: RootState) => ({
  name, image, type, address, proof, tokenId, amount, dropAddress, provider, dropSDK, index, title, allowedAddressList, logoURL, description
})

const mapDispatcherToProps = (dispatch: Dispatch<DropActions> & Dispatch<TokenActions>) => {
  return {
    claimERC1155: (
      address: string,
      proof: string[],
      tokenId: string,
      amount: string,
      dropAddress: string,
      provider: any,
      dropSDK: DropSDK,
      index: number
    ) => dropAsyncActions.claimERC1155(
      dispatch,
      provider,
      dropSDK,
      index,
      amount,
      address,
      tokenId,
      dropAddress,
      proof
    ),
    claimERC721: (
      address: string,
      proof: string[],
      tokenId: string,
      dropAddress: string,
      provider: any,
      dropSDK: DropSDK,
      index: number
    ) => dropAsyncActions.claimERC721(
      dispatch,
      provider,
      dropSDK,
      index,
      address,
      tokenId,
      dropAddress,
      proof
    ),
    claimERC20: (
      address: string,
      proof: string[],
      amount: string,
      dropAddress: string,
      provider: any,
      dropSDK: DropSDK,
      index: number
    ) => dropAsyncActions.claimERC20(
      dispatch,
      provider,
      dropSDK,
      index,
      amount,
      address,
      dropAddress,
      proof
    ),
    stepStep: (step: TDropStep) => dispatch(dropActions.setStep(step))
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>


const InitialScreen: FC<ReduxType> = ({
  name,
  title,
  description,
  allowedAddressList,
  logoURL,
  type,
  address,
  proof,
  tokenId,
  amount,
  dropAddress,
  provider,
  dropSDK,
  index,
  claimERC1155,
  claimERC721,
  claimERC20,
  stepStep
}) => {
  if (!dropSDK) return null
  const allowed = allowedAddressList.some(item => item.toLowerCase() === address.toLocaleLowerCase())
  return <Widget
    image={logoURL && <TokenImage
      src={logoURL}
      alt={name}
      />}
    >
    <Title>{title}</Title>
    <Description>{description}</Description>
    <ScreenButton
      disabled={
        (type === 'erc1155' && (!tokenId || !amount || !allowed)) ||
        (type === 'erc721' && (!tokenId || !allowed)) ||
        (type === 'erc20' && (!amount || !allowed))
      }
      title='Claim'
      onClick={() => {
        console.log({ type })
        if (type === 'erc1155' && tokenId && amount) {
          return claimERC1155(address, proof, tokenId, amount, dropAddress, provider, dropSDK, index)
        }
        if (type === 'erc721' && tokenId) {
          return claimERC721(address, proof, tokenId, dropAddress, provider, dropSDK, index)
        }
        if (type === 'erc20' && amount) {
          return claimERC20(address, proof, amount, dropAddress, provider, dropSDK, index)
        }
      } }
      />
    <TextComponent
      onClick={() => {
        console.log('here')
        stepStep('check_eligibility')
      } }
      >Check here if you are eligible<br />for this RetroDrop<IconComponent /></TextComponent>
  </Widget>
}

export default connect(mapStateToProps, mapDispatcherToProps)(InitialScreen)
