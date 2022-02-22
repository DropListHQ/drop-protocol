import { AnchorLink } from './styled-components'
import { FC } from 'react'

type TProps = {
  href: string,
  target?: string
}

const Link: FC<TProps> = ({ href, target, children }) => {
  return <AnchorLink to={href} target={target}>{children}</AnchorLink>
}

export default Link