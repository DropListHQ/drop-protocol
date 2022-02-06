import React, { FC } from 'react'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import Metamask from 'images/metamask@2x.png'
import { FramedIconComponent, TextComponent, ButtonComponent, Container } from './styled-components'

const mapStateToProps = ({
  user: { chainId },
  drop: { chainId: dropChainId },
}: RootState) => ({
  chainId,
  dropChainId
})

type ReduxType = ReturnType<typeof mapStateToProps> 


const SetConnector: FC<ReduxType> = () => {
  const { host, pathname } = window.location
  return <Container>
    <FramedIconComponent src={Metamask} alt='Metamask' maxWidth={64} />
    <TextComponent>Connect your wallet via Metamask</TextComponent>
    <ButtonComponent
      title='Use MetaMask'
      onClick={() => {
        window.location.href = `https://metamask.app.link/dapp/${host}${pathname}`
      }}
    />
  </Container>
}

export default connect(mapStateToProps)(SetConnector)