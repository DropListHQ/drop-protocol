import React, { FC } from 'react'
import { MiniWidget, Title } from 'components/common'
import { RootState } from 'data/store';
import { connect } from 'react-redux';
import { Container, TypeWidgets } from './styled-components'
import { TRetroDropType } from 'types'

const mapStateToProps = ({
  drops: { retroDrops },
  user: { address }
}: RootState) => ({
  retroDrops,
  address
})

type TProps = {
  onTypeChoose: (type: TRetroDropType) => void
}

type ReduxType = ReturnType<typeof mapStateToProps>

const RetroactiveDrops: FC<ReduxType & TProps> = ({ onTypeChoose }) => {
  return <div>
    <Container>
      <Title>New Campaigns</Title>
      <TypeWidgets>
        <MiniWidget
          title='ERC1155'
          subtitle='ethereum'
          description='Semi-fungible tokens'
          buttonTitle='Select Type'
          action={() => {
            onTypeChoose('erc1155')
          }}
        />
        <MiniWidget
          title='ERC721'
          subtitle='ethereum'
          description='Non fungible tokens (NFT)'
          buttonTitle='Select Type'
          action={() => {
            onTypeChoose('erc721')
          }}
        />
        <MiniWidget
          title='ERC20'
          subtitle='ethereum'
          description='Fungible tokens'
          buttonTitle='Select Type'
          action={() => {
            onTypeChoose('erc20')
          }}
        />
      </TypeWidgets>
      
      
    </Container>
  </div>
}

export default connect(mapStateToProps)(RetroactiveDrops)
