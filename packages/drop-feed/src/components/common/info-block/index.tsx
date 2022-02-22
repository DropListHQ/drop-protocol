import { FC } from 'react'
import { Wrapper, WrapperTitle, WrapperContent } from './styled-components'

type TProps = {
  title: string,
  className?: string
}


const InfoBlock: FC<TProps> = ({ title, children, className }) => {
  return <Wrapper className={className}>
    <WrapperTitle>{title}</WrapperTitle>
    <WrapperContent>{children}</WrapperContent>
  </Wrapper>
}


export default InfoBlock