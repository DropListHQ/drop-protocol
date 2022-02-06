import React, { FC } from 'react'
import { RootState } from 'data/store'
import { connect } from 'react-redux'

const mapStateToProps = ({
  user: { address },
  drop: { allowedAddressList },
}: RootState) => ({
  address,
  allowedAddressList
})
type ReduxType = ReturnType<typeof mapStateToProps>

const NotAllowedForClaim: FC<ReduxType> = ({ address, allowedAddressList }) => {
  return <>
    Unfortunately you cannot claim drop with address {address}. Allowed addresses: {allowedAddressList.join(', ')}
  </>
}

export default connect(mapStateToProps)(NotAllowedForClaim)