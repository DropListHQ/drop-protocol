import React, { FC } from 'react'
import { ContainerWrapper } from './styled-components'

type TProps = {
  className?: string
}

const Container: FC<TProps> = ({ children, className }) => {
  return <ContainerWrapper className={className}>
    {children}
  </ContainerWrapper>
}

export default Container