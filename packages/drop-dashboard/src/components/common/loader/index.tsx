import React, { FC } from 'react'

import {
  Loader,
  LoaderSegmentA,
  LoaderSegmentB,
  LoaderSegmentC,
  LoaderSegmentD
} from './styled-components'

interface Props {
  size?: 'default' | 'large' | 'small',
  className?: string
}

const LoaderComponent: FC<Props> = ({ size = 'default', className = '' }) => {
  return <Loader size={size} className={className}>
    <LoaderSegmentA size={size} />
    <LoaderSegmentB size={size} />
    <LoaderSegmentC size={size} />
    <LoaderSegmentD size={size} />
  </Loader>
}

export default LoaderComponent