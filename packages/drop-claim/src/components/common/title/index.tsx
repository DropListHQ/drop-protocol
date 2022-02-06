import React, { FC } from 'react'
import { TitleComponent } from './styled-components'

import TProps from './types'

const Title: FC<TProps> = ({ children, className }) => {
  return <TitleComponent className={className}>{children}</TitleComponent>
}

export default Title