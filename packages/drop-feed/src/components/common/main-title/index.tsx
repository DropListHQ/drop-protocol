import React, { FC } from 'react'
import { TitleComponent } from './styled-components'

const MainTitle: FC = ({ children }) => {
  return <TitleComponent>{children}</TitleComponent>
}

export default MainTitle