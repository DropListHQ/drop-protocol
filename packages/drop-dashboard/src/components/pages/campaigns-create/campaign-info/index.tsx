import { FC, useEffect, useState } from 'react'
import {
  WidgetInput,
  WidgetControls,
  WidgetButton,
  DoubleWidget,
} from '../styled-components'
import { RootState } from 'data/store';
import {
  Widget,
  PreviewWidget,
  Textarea
} from 'components/common'
import * as newRetroDropAsyncActions from 'data/store/reducers/new-retro-drop/async-actions'
import { Dispatch } from 'redux';
import { NewRetroDropActions } from 'data/store/reducers/new-retro-drop/types'
import { connect } from 'react-redux'
import { TRetroDropType } from 'types';
import { useHistory } from 'react-router-dom'

type TProps = {
  cancel: () => void
}

const mapStateToProps = ({
  user: { address, provider, chainId },
  newRetroDrop: { loading, stepsCompleted, tokenAddress, ipfs, merkleTree, type, title, description, logoURL },
}: RootState) => ({
  loading,
  address,
  provider,
  ipfs,
  stepsCompleted,
  tokenAddress,
  merkleTree,
  chainId,
  type,
  title, description, logoURL
})
const mapDispatcherToProps = (dispatch: Dispatch<NewRetroDropActions>) => {
  return {
    createIPFS: (
      data: any,
      title: string,
      description: string,
      logoURL: string,
      tokenAddress: string,
      chainId: number,
      type: TRetroDropType,
      callback: () => void
    ) => newRetroDropAsyncActions.createIPFS(
      dispatch,
      data,
      title,
      description,
      logoURL,
      tokenAddress,
      chainId,
      type,
      callback
    ),
  }
}
type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps> & TProps


const CampaignInfo: FC<ReduxType> = ({
  loading,
  cancel,
  createIPFS,
  tokenAddress,
  merkleTree,
  chainId,
  type,
  stepsCompleted,
  title, description, logoURL
}) => {
  const history = useHistory()
  const [ dropTitle, setDropTitle ] = useState(title || '')
  const [ dropLogoURL, setDropLogoURL ] = useState(logoURL || '')
  const [ dropDescription, setDropDescription ] = useState(description || '')
  useEffect(() => {
    if (stepsCompleted.indexOf('create_tree') > -1) { return }
    return history.push(`/campaigns/new?step=${stepsCompleted[stepsCompleted.length - 1]}`)
  }, [])
  return <DoubleWidget>
    <Widget>
      <WidgetInput
        title='Drop’s title'
        onChange={value => { setDropTitle(value); return value}}
        value={dropTitle}
      />
      <WidgetInput
        title='Logo URL'
        onChange={value => { setDropLogoURL(value); return value}}
        value={dropLogoURL}
        placeholder='https://'
      />
      <Textarea
        title='Description'
        onChange={value => { setDropDescription(value); return value}}
        value={dropDescription}
        limit={120}
        placeholder='Enter description here'
      />
      <WidgetControls>
        <WidgetButton
          title='Start over'
          appearance='default'
          onClick={cancel}
        />
        <WidgetButton
          title={loading ? 'Processing' : 'Continue'}
          loading={loading}
          appearance='default'
          disabled={!dropTitle || !tokenAddress || loading}
          onClick={() => {
            if (!tokenAddress || !chainId || !type) { return }
            createIPFS(merkleTree, dropTitle, dropDescription, dropLogoURL, tokenAddress, chainId, type, () => {
              console.log({ dropLogoURL })
              history.push(`/campaigns/new?step=deploy_contract`)
            })
          }}
        />
      </WidgetControls>
    </Widget>
    <PreviewWidget
      title={dropTitle}
      description={dropDescription}
      image={dropLogoURL}
    />
  </DoubleWidget>
}

export default connect(mapStateToProps, mapDispatcherToProps)(CampaignInfo)

