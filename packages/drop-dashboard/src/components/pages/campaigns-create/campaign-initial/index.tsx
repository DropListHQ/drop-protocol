import { FC, useState, useEffect } from 'react'
import {
  Widget
} from 'components/common'
import {
  WidgetInput,
  WidgetControls,
  WidgetButton
} from '../styled-components'
import { TRetroDropType } from 'types'
import { NewRetroDropActions } from 'data/store/reducers/new-retro-drop/types'
import { Dispatch } from 'redux';
import { connect } from 'react-redux'
import { RootState } from 'data/store';
import * as newRetroDropAsyncActions from 'data/store/reducers/new-retro-drop/async-actions'
import { useHistory } from 'react-router-dom'

type TProps = {
  cancel: () => void
}

const mapStateToProps = ({
  newRetroDrop: { type, stepsCompleted, tokenAddress },
  user: { provider }
}: RootState) => ({
  type,
  provider,
  stepsCompleted,
  tokenAddress
})

const mapDispatcherToProps = (dispatch: Dispatch<NewRetroDropActions>) => {
  return {
    setTokenContractData: (tokenAddress: string, provider: any, type: TRetroDropType, callback: () => void) => newRetroDropAsyncActions.setTokenContractData(dispatch, tokenAddress, provider, type, callback),
  }
}
type ReduxType = ReturnType<typeof mapDispatcherToProps> & TProps & ReturnType<typeof mapStateToProps>

const CampaignInfo: FC<ReduxType> = ({
  cancel,
  setTokenContractData,
  type,
  provider,
  stepsCompleted,
  tokenAddress
}) => {
  const [ currentTokenAddress, setCurrentTokenAddress ] = useState(tokenAddress || '')
  const history = useHistory()

  useEffect(() => {
    if (stepsCompleted.indexOf('choose_type') > -1) { return }
    return history.push(`/campaigns/new?step=${stepsCompleted[stepsCompleted.length - 1]}`)
  }, [])

  return <Widget>
    <WidgetInput
      title='Contract address'
      onChange={value => { setCurrentTokenAddress(value); return value}}
      value={currentTokenAddress}
      placeholder='Enter contract address'
    />
    <WidgetControls>
      <WidgetButton
        title='Cancel'
        appearance='default'
        onClick={cancel}
      />
      <WidgetButton
        title='Continue'
        appearance='default'
        disabled={currentTokenAddress.length !== 42}
        onClick={() => {
          if (!type) { return }
          setTokenContractData(currentTokenAddress, provider, type, () => {
            history.push(`/campaigns/new?step=create_tree`)
          })
        }}
      />
    </WidgetControls>
  </Widget>
}

export default connect(mapStateToProps, mapDispatcherToProps)(CampaignInfo)