import styled from 'styled-components'

type TProps = {
  src: string,
  alt: string
}
export const TokenImage = styled.img<TProps>`
  width: 343px;
  height: 282px;
  max-width: 100%;
  object-fit: cover;
  display: block;
`