import { FC } from 'react'
import {
  WidgetControls,
  WidgetButton,
  WidgetDataSplit,
  WidgetDataBlock
} from '../styled-compoents'
import { RootState } from 'data/store';
import {
  Widget,
  DataBlock
} from 'components/common'
import { defineNetworkName, countTotalTokens, capitalize } from 'helpers'
import { TMerkleTree, TRecipientsData, TRetroDropType } from 'types'
import { Dispatch } from 'redux';
import { NewRetroDropActions } from 'data/store/reducers/new-retro-drop/types'
import { connect } from 'react-redux'
import { ContractActions } from 'data/store/reducers/contract/types'
import {
  createDrop
} from 'data/store/reducers/contract/async-actions'

type TProps = {
  dropTitle: string,
  recipients: TRecipientsData,
  cancel: () => void
}

const mapStateToProps = ({
  user: { address, provider, chainId },
  newRetroDrop: { loading, step, tokenAddress, ipfs, merkleTree, type, decimals },
  contract: { loading: contractLoading },
}: RootState) => ({
  loading,
  address,
  provider,
  ipfs,
  step,
  tokenAddress,
  merkleTree,
  decimals,
  chainId,
  contractLoading,
  type
})
const mapDispatcherToProps = (dispatch: Dispatch<ContractActions> & Dispatch<NewRetroDropActions>) => {
  return {
    createDrop: (
      provider: any,
      merkleTree: TMerkleTree,
      tokenAddress: string,
      ipfsHash: string,
      chainId: number,
      type: TRetroDropType
    ) => createDrop(dispatch, provider, merkleTree, tokenAddress, ipfsHash, chainId, type)
  }
}
type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps> & TProps


const CampaignDeploy: FC<ReduxType> = ({
  dropTitle,
  cancel,
  chainId,
  recipients,
  contractLoading,
  tokenAddress,
  ipfs,
  provider,
  merkleTree,
  createDrop,
  type,
  decimals
}) => {
  return <Widget>
    <DataBlock
      title='RetroDrop’s title'
      text={dropTitle}
    />
    <WidgetDataSplit>
      <WidgetDataBlock
        title='Network'
        text={capitalize(defineNetworkName(chainId))}
      />
      {type && <WidgetDataBlock
        title='Type of token'
        text={type}
      />}
    </WidgetDataSplit>
    <DataBlock
      title='Token Address'
      text={tokenAddress || ''}
    />
    <WidgetDataSplit>
      <WidgetDataBlock
        title='Total tokens dropped'
        text={recipients ? countTotalTokens(recipients, type, decimals) : 0}
      />
      <WidgetDataBlock
        title='Recipients'
        text={recipients ? Object.keys(recipients).length : 0}
      />
    </WidgetDataSplit>
    <WidgetControls>
      <WidgetButton
        title='Start over'
        appearance='inverted'
        onClick={cancel}
      />
      <WidgetButton
        title='Deploy'
        appearance={contractLoading ? 'gradient' : undefined}
        disabled={Boolean(!tokenAddress || !ipfs)}
        loading={contractLoading}
        onClick={() => {
          if (tokenAddress && ipfs && chainId && type) {
            createDrop(provider, merkleTree, tokenAddress, ipfs, chainId, type)
          }
        }}
      />
    </WidgetControls>
  </Widget>
}

export default connect(mapStateToProps, mapDispatcherToProps)(CampaignDeploy)

