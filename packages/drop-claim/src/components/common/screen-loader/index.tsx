import React, { FC } from 'react'
import { ScreenLoader } from './styled-components'

type TProps = {
  className?: string,
  size?: 'default' | 'large' | 'small'
}


const ScreenLoaderComponent: FC<TProps> = ({
  size = 'normal',
  className
}) => {
  return <ScreenLoader size={size} className={className} />
}


export default ScreenLoaderComponent