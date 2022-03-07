import React, { FC } from 'react'
import { TokenImage } from './styled-components'

type TProps = {
  src: string,
  alt: string,
  className?: string
}

const TokenImageComponent: FC<TProps> = ({ src, alt, className }) => {
  return <TokenImage src={src} alt={alt} className={className} />
}

export default TokenImageComponent