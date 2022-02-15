import { FC } from 'react'
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

type TProps = {
  dropTitle: string,
  dropLogoURL: string,
  dropDescription: string,
  setDropTitle: (value: string) => void,
  setDropLogoURL: (value: string) => void,
  setDropDescription: (value: string) => void,
  cancel: () => void
}

const mapStateToProps = ({
  user: { address, provider, chainId },
  newRetroDrop: { loading, step, tokenAddress, ipfs, merkleTree, type },
}: RootState) => ({
  loading,
  address,
  provider,
  ipfs,
  step,
  tokenAddress,
  merkleTree,
  chainId,
  type
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
      type: TRetroDropType
    ) => newRetroDropAsyncActions.createIPFS(
      dispatch,
      data,
      title,
      description,
      logoURL,
      tokenAddress,
      chainId,
      type
    ),
  }
}
type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps> & TProps


const CampaignInfo: FC<ReduxType> = ({
  dropTitle,
  dropLogoURL,
  dropDescription,
  loading,
  setDropTitle,
  setDropLogoURL,
  setDropDescription,
  cancel,
  createIPFS,
  tokenAddress,
  merkleTree,
  chainId,
  type
}) => {
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
            createIPFS(merkleTree, dropTitle, dropDescription, dropLogoURL, tokenAddress, chainId, type)
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

