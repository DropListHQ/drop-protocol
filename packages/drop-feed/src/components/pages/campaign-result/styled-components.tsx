import styled from 'styled-components'
import { Button } from 'components/common'

export const Container = styled.div`
  max-width: 376px;
  margin: 50px auto 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Image = styled.img`
  width: 340px;
  height: 340px;
  object-fit: cover;
  object-position: center;
  margin-bottom: 36px;
`

export const Title = styled.h1`
  font-size: 24px;
  margin: 0 0 24px;
`

export const Text = styled.p`
  font-size: 16px;
  margin: 0 0 36px;
`

export const ButtonItem = styled(Button)`
  min-width: 220px;
  margin-bottom: 20px;
`

