import { FC } from 'react'
import { TextComponent } from './styled-components'

const Text: FC = ({ children }) => {
  return <TextComponent>{children}</TextComponent>
}

export default Text