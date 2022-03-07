import { FC } from 'react'
import { TextComponent } from './styled-components'

type TProps = {
  className?: string,
  onClick?: () => void
}

const Text: FC<TProps> = ({ children }) => {
  return <TextComponent>{children}</TextComponent>
}

export default Text