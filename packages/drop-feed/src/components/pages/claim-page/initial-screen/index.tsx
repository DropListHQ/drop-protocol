import React, { FC } from 'react'
import { Widget } from 'components/common'
import { Title, ScreenButton, TextComponent, IconComponent, Description } from './styled-components'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { CampaignActions } from 'data/store/reducers/campaign/types'
import { TokenActions } from 'data/store/reducers/token/types'
import * as dropAsyncActions from 'data/store/reducers/campaign/async-actions'
import { Dispatch } from 'redux';
import * as dropActions from 'data/store/reducers/campaign/actions'
import { TCampaignStep } from 'types'

const mapStateToProps = ({
  token: { name, image },
  user: { address, provider },
  campaign: { proof, tokenId, amount, index, allowedAddressList, logoURL, title, type }
}: RootState) => ({
  name, image, type, address, proof, tokenId, amount, provider, index, title, allowedAddressList, logoURL
})

const mapDispatcherToProps = (dispatch: Dispatch<CampaignActions> & Dispatch<TokenActions>) => {
  return {
      claimERC1155: (
        address: string,
        proof: string[],
        tokenId: string,
        amount: string,
        dropAddress: string,
        provider: any,
        index: number
      ) => dropAsyncActions.claimERC1155(
        dispatch,
        provider,
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
        index: number
      ) => dropAsyncActions.claimERC721(
        dispatch,
        provider,
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
        index: number
      ) => dropAsyncActions.claimERC20(
        dispatch,
        provider,
        index,
        amount,
        address,
        dropAddress,
        proof
      ),
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps> 


const InitialScreen: FC<ReduxType> = ({
  name,
  title,
  allowedAddressList,
  logoURL,
  type,
  address,
  proof,
  tokenId,
  amount,
  provider,
  index,
  claimERC1155,
  claimERC721,
  claimERC20,
}) => {
  const allowed = allowedAddressList.some(item => item.toLowerCase() === address.toLocaleLowerCase())
  return <Widget
      // image={logoURL && <TokenImage
      //   src={logoURL}
      //   alt={name}
      // />}
    > 
    <Title>{title}</Title>
    <Description></Description>
    <ScreenButton
      disabled={
        (type === 'erc1155' && (!tokenId || !amount || !allowed)) ||
        (type === 'erc721' && (!tokenId || !allowed)) ||
        (type === 'erc20' && (!amount || !allowed))
      }
      title='Claim'
      onClick={() => {
        console.log({ type })
        // if (type === 'erc1155' && tokenId && amount) {
        //   return claimERC1155(address, proof, tokenId, amount, dropAddress, provider, index)
        // }
        // if (type === 'erc721' && tokenId) {
        //   return claimERC721(address, proof, tokenId, dropAddress, provider, index)
        // }
        // if (type === 'erc20' && amount) {
        //   return claimERC20(address, proof, amount, dropAddress, provider, index)
        // }
      }}
    />
    <TextComponent
      onClick={() => {
        console.log('here')
      }}
    >Check here if you are eligible<br />for this RetroDrop<IconComponent /></TextComponent>
  </Widget>
}

export default connect(mapStateToProps, mapDispatcherToProps)(InitialScreen)