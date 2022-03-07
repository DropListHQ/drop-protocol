import React, { FC } from 'react'
import { RootState } from 'data/store'
import { connect } from 'react-redux'

const mapStateToProps = ({
  user: { chainId },
  drop: { chainId: dropChainId },
}: RootState) => ({
  chainId,
  dropChainId
})

type ReduxType = ReturnType<typeof mapStateToProps> 


const ChangeNetwork: FC<ReduxType> = ({
  chainId,
  dropChainId
}) => {
  return <>
    change network. now it is {chainId}, but should be {dropChainId}
  </>
}

export default connect(mapStateToProps)(ChangeNetwork)