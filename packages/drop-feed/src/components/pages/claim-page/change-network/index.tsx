import React, { FC } from 'react'
import { RootState } from 'data/store'
import { connect } from 'react-redux'

const mapStateToProps = ({
  user: { chainId },
  campaign: { chainId: campaignChainId },
}: RootState) => ({
  chainId,
  campaignChainId
})

type ReduxType = ReturnType<typeof mapStateToProps> 


const ChangeNetwork: FC<ReduxType> = ({
  chainId,
  campaignChainId
}) => {
  return <>
    change network. now it is {chainId}, but should be {campaignChainId}
  </>
}

export default connect(mapStateToProps)(ChangeNetwork)