import React, { FC } from 'react'
import { Container, Image } from './styled-components'

type TFramedIcon = {
  src: string,
  alt: string,
  className?: string,
  maxWidth?: number
}

const FramedIcon: FC<TFramedIcon> = ({ className, src, alt, maxWidth = 64 }) => {
  return <Container className={className}>
    <Image src={src} alt={alt} style={{ maxWidth }}/>
  </Container>
}

export default FramedIcon