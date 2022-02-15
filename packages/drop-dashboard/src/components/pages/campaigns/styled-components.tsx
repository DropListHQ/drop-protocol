import styled from 'styled-components'

export const Container = styled.div`
  margin-bottom: 36px;

  &:last-child {
    margin-bottom: 0px;
  }
`

export const Text = styled.p`
  max-width: 350px;
  margin: 0 0 36px;
  font-size: 16px;
`

export const Campaigns = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  grid-gap: 20px;
  margin-bottom: 24px;
`