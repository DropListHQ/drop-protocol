import styled, { keyframes, css } from 'styled-components'

const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

interface LoaderProps {
  size: 'default' | 'large' | 'small'
}

export const Loader = styled.div<LoaderProps>`
  display: inline-block;
  position: relative;
  width: 40px;
  height: 40px;

  ${props  => props.size === 'large' && css`
    width: 80px;
    height: 80px;
  `}

  ${props  => props.size === 'small' && css`
    width: 10px;
    height: 10px;
  `}
`

const LoaderSegment = styled.div<LoaderProps>`
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 32px;
  height: 32px;
  margin: 4px;
  border: 4px solid ${props => props.theme.secondaryBorderColor};
  border-radius: 50%;
  animation: ${rotation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: ${props => props.theme.secondaryBorderColor} transparent transparent transparent;
  ${props  => props.size === 'large' && css`
    width: 64px;
    height: 64px;
    margin: 8px;
    border-width: 8px;
  `}
  ${props  => props.size === 'small' && css`
    width: 10px;
    height: 10px;
    margin: 0px;
    border-width: 2px;
  `}
`

export const LoaderSegmentA = styled(LoaderSegment)`
  animation-delay: -0.45s;
`

export const LoaderSegmentB = styled(LoaderSegment)`
  animation-delay: -0.3s;
`

export const LoaderSegmentC = styled(LoaderSegment)`
  animation-delay: -0.15s;
`

export const LoaderSegmentD = styled(LoaderSegment)`

`