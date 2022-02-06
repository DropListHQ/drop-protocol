import React, { FC } from 'react'
import { TitleComponent } from './styled-components'

type TProps = {
  
}

const Title: FC<TProps> = ({ children }) => {
  return <TitleComponent>{children}</TitleComponent>
}

export default Title