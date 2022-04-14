import { FC } from 'react'
import { Popup } from '../index'
import { RootState } from 'data/store';
import { connect } from 'react-redux';
import { shortenString, defineNetworkName } from 'helpers'
import { Title } from './styled-components'

type TProps = {
  onClose: () => void
}
const mapStateToProps = ({ user: { provider, address, chainId } }: RootState) => ({ provider, address, chainId })
type ReduxType = ReturnType<typeof mapStateToProps>

const ConnectorPopup: FC<ReduxType & TProps> = ({
  address,
  chainId,
  onClose
}) => {
  return <Popup title='Wallet information' onClose={onClose}>
    <Title>Connected wallet: <span>{shortenString(address)}</span></Title>
    <Title>Network: <span>{defineNetworkName(chainId)}</span></Title>
  </Popup>
} 

export default connect(mapStateToProps)(ConnectorPopup)