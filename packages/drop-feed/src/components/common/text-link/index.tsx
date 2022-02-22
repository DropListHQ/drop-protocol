import { TextLink } from './styled-components'
import { FC } from 'react'

type TProps = {
  href: string,
  target?: string
}

const Link: FC<TProps> = ({ href, target, children }) => {
  return <TextLink href={href} target={target}>{children}</TextLink>
}

export default Link