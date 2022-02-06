import styled, { keyframes, css } from 'styled-components'

const pulse = keyframes`
  0% {
    transform: scale(0.6);
    opacity: 0;
  }
  33% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.4);
    opacity: 0;
  }
`

type TProps = {
  className?: string,
  size: string
}


export const ScreenLoader = styled.div<TProps>`
  border-radius: 50px;
  line-height: 100px;
  text-align: center;
  width: 100px;
  margin: 20px;
  height: 100px;
  position: relative;
  text-transform: uppercase;
  letter-spacing: 0.05em;



  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${props => props.theme.loaderPrimaryColor};
    border-radius: 50px;
    opacity: 0;
  }
  &:before {
    transform: scale(1);
    animation: ${pulse} 2s infinite linear;
  }
    
  &:after {
    animation: ${pulse} 2s 1s infinite linear;
  }

  ${props  => props.size === 'large' && css`
    width: 140px;
    height: 140px;
    border-radius: 140px;
  `}
  ${props  => props.size === 'small' && css`
    width: 60px;
    height: 60px;
    border-radius: 60px;
  `}
`
