import React, { FC, useState } from 'react'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { ScreenInput, ScreenButton, Title, Container, ScreenText, BackButton } from './styled-components'
import { TCampaignStep } from 'types'
import * as dropActions from 'data/store/reducers/campaign/actions'
import { Dispatch } from 'redux';
import { CampaignActions } from 'data/store/reducers/campaign/types'
import Icons from 'icons'

const mapStateToProps = ({
  user: { address },
  campaign: { allowedAddressList },
}: RootState) => ({
  address,
  allowedAddressList
})
const mapDispatcherToProps = (dispatch: Dispatch<CampaignActions>) => {
  return {
  }
}
type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>
type TStatus = 'default' | 'success' | 'error'

const CheckEligibility: FC<ReduxType> = ({ address, allowedAddressList }) => {
  const [ value, setValue ] = useState('')
  const [ status, setStatus ] = useState<TStatus>('default')
  return <Container>
    <BackButton
      onClick={() => {  }}
    ><Icons.ArrowIcon />Back</BackButton>
    <Title>Check eligibility</Title>
    <ScreenText>To check eligibility paste your address below:</ScreenText>
    <ScreenInput
      value={value}
      error={status === 'error' ? '😢 Sorry, you are not eligible for this drop' : undefined}
      info={status === 'success' ? '🤘 This address is eligible for the drop' : undefined}
      title='Address'
      onChange={value => {
        setValue(value);
        setStatus('default')
        return value
      }}
    />
    <ScreenButton
      title={status === 'success' ? 'Claim now' : 'Check'}
      onClick={() => {
        if (status === 'success') {
          return 
        }
        if (allowedAddressList.find((item: string) => item.toLowerCase() === value.toLocaleLowerCase())) {
          setStatus('success')
        } else {
          setStatus('error')
        }
      }}
      disabled={value.length !== 42}
    />
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(CheckEligibility)