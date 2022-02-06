import { FC } from 'react'
import { ScreenSubtitle, Loader, ScreenTitle, Container, Link } from './styled-components'
import { Text } from 'components/common'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { defineExplorerURL } from 'helpers'
import Icons from 'icons'

const mapStateToProps = ({
  user: { chainId },
  drop: { hash }
}: RootState) => ({
  hash,
  chainId
})
type ReduxType = ReturnType<typeof mapStateToProps>

const ClaimingProcess: FC<ReduxType> = ({ hash, chainId }) => {
  const explorerUrl = chainId && hash ? <span>See details on <Link target='_blank' href={`${defineExplorerURL(chainId)}/tx/${hash}`}>Explorer</Link></span> : null
  return <Container>
    <Loader>
      <Icons.DroplistLogo width='40' height='48' />
    </Loader>
    <ScreenTitle>Claiming…</ScreenTitle>
    <ScreenSubtitle>Transaction is processing</ScreenSubtitle>
    <Text>It may take a few minutes. You can<br/>check back later. {explorerUrl}</Text>
  </Container>
}

export default connect(mapStateToProps)(ClaimingProcess)
