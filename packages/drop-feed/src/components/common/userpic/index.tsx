import { Userpic } from './styled-components'
import { FC } from 'react'

type TProps = {
  src: string,
  alt: string,
  className?: string
}

const UserpicComponent: FC<TProps> = ({ src, alt, className }) => {
  return <Userpic
    className={className}
    src={src}
    alt={alt}
  />
}

export default UserpicComponent
