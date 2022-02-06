import React, { FC, useState } from 'react'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { ScreenInput, ScreenButton, Title, Container, ScreenText, BackButton } from './styled-components'
import { TDropStep } from 'types'
import * as dropActions from 'data/store/reducers/drop/actions'
import { Dispatch } from 'redux';
import { DropActions } from 'data/store/reducers/drop/types'
import Icons from 'icons'

const mapStateToProps = ({
  user: { address },
  drop: { allowedAddressList },
}: RootState) => ({
  address,
  allowedAddressList
})
const mapDispatcherToProps = (dispatch: Dispatch<DropActions>) => {
  return {
    stepStep: (step: TDropStep) => dispatch(dropActions.setStep(step))
  }
}
type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>
type TStatus = 'default' | 'success' | 'error'

const CheckEligibility: FC<ReduxType> = ({ address, allowedAddressList, stepStep }) => {
  const [ value, setValue ] = useState('')
  const [ status, setStatus ] = useState<TStatus>('default')
  return <Container>
    <BackButton
      onClick={() => { return stepStep('initial') }}
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
          return stepStep('initial')
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