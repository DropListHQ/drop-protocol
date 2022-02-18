import { FC, useEffect } from 'react'
import {
  WidgetControls,
  WidgetButton,
  WidgetDataSplit,
  WidgetDataBlock,
  DoubleWidget
} from '../styled-components'
import { RootState } from 'data/store';
import {
  Widget,
  DataBlock,
  PreviewWidget
} from 'components/common'
import { defineNetworkName, countTotalTokens, capitalize, defineEtherscanUrl } from 'helpers'
import { TMerkleTree, TRecipientsData, TRetroDropType } from 'types'
import { Dispatch } from 'redux';
import { NewRetroDropActions } from 'data/store/reducers/new-retro-drop/types'
import { connect } from 'react-redux'
import { ContractActions } from 'data/store/reducers/contract/types'
import {
  createDrop
} from 'data/store/reducers/contract/async-actions'
import { useHistory } from 'react-router-dom'

type TProps = {
  recipients: TRecipientsData,
  cancel: () => void
}

const mapStateToProps = ({
  user: { address, provider, chainId },
  newRetroDrop: { loading, tokenAddress, ipfs, merkleTree, type, decimals, stepsCompleted, title, description, logoURL },
  contract: { loading: contractLoading },
}: RootState) => ({
  loading,
  address,
  provider,
  ipfs,
  tokenAddress,
  merkleTree,
  decimals,
  chainId,
  contractLoading,
  type,
  stepsCompleted,
  title, description, logoURL
})
const mapDispatcherToProps = (dispatch: Dispatch<ContractActions> & Dispatch<NewRetroDropActions>) => {
  return {
    createDrop: (
      provider: any,
      merkleTree: TMerkleTree,
      tokenAddress: string,
      ipfsHash: string,
      chainId: number,
      type: TRetroDropType,
      callback: () => void
    ) => createDrop(dispatch, provider, merkleTree, tokenAddress, ipfsHash, chainId, type, callback)
  }
}
type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps> & TProps


const CampaignDeploy: FC<ReduxType> = ({
  title, description, logoURL,
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
  decimals,
  stepsCompleted
}) => {
  const history = useHistory()
  useEffect(() => {
    if (stepsCompleted.indexOf('publish_ipfs') > -1) { return }
    return history.push(`/campaigns/new?step=${stepsCompleted[stepsCompleted.length - 1]}`)
  }, [])
  return <DoubleWidget>
    <Widget>
      <DataBlock
        title='Drop’s title'
        text={title}
      />
      <WidgetDataSplit>
        <WidgetDataBlock
          title='Network'
          text={capitalize(defineNetworkName(chainId))}
        />
        {type && <WidgetDataBlock
          title='Type of token'
          text={type.toUpperCase()}
        />}
      </WidgetDataSplit>
      {tokenAddress && <DataBlock
        title='Token Address'
        link={defineEtherscanUrl(chainId, tokenAddress)}
        text={tokenAddress}
      />}
      <WidgetDataSplit>
        <WidgetDataBlock
          title='Tokens to drop'
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
          appearance='default'
          onClick={cancel}
        />
        <WidgetButton
          title={contractLoading ? 'Deploying' : 'Deploy'}
          appearance='default'
          disabled={Boolean(!tokenAddress || !ipfs || contractLoading)}
          loading={contractLoading}
          onClick={() => {
            if (tokenAddress && ipfs && chainId && type) {
              createDrop(provider, merkleTree, tokenAddress, ipfs, chainId, type, () => {
                history.push(`/campaigns/new?step=give_approval`)
              })
            }
          }}
        />
      </WidgetControls>
    </Widget>
    <PreviewWidget
      title={title || ''}
      description={description || ''}
      image={logoURL || ''}
    />
  </DoubleWidget>
}

export default connect(mapStateToProps, mapDispatcherToProps)(CampaignDeploy)

