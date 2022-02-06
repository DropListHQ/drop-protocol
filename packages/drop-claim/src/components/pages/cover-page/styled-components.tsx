import styled from 'styled-components'
import { Footer } from 'components/common'


type TContainer = {
  image: string
}
export const Container = styled.div<TContainer>`
  width: 100vw;
  height: 100vh;
  background-image: url(${props => props.image});
  background-size: cover;
  background-repeat: none;
  background-position: 50% 50%;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export const Title = styled.h1`
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  color: ${props => props.theme.secondaryTextColor};
  margin: 0 0 24px;
`

export const Subtitle = styled.h2`
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: ${props => props.theme.secondaryTextColor};
  margin: 0;
`

export const ContainerFooter = styled(Footer)`
  color: ${props => props.theme.secondaryTextColor};
  position: absolute;
  bottom: 0;

  svg path {
    fill: ${props => props.theme.secondaryTextColor};
  }
`