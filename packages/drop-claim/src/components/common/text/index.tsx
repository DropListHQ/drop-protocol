import React, { FC } from 'react'
import { TextComponent } from './styled-components'

import TProps from './types'

const Text: FC<TProps> = ({ children, className, onClick }) => {
  return <TextComponent onClick={onClick} className={className}>{children}</TextComponent>
}

export default Text