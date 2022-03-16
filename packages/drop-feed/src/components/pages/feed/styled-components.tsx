import styled from 'styled-components'
import { Select, Button } from 'components/common'

export const CommunityFilter = styled(Select)`
  max-width: 300px;
  width: 100%;
`

export const Filter = styled(Select)`
  width: 100%;
  margin-left: 18px;
`

export const Filters = styled.div`
  display: flex;
  margin-bottom: 42px;
`

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid: 20px 24px;
`

export const MainTitle = styled.h1`
  font-size: 34px;
  margin: 0 0 36px;
`

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
`

export const MainInfo = styled.div`
  max-width: 460px;
  width: 100%;
`

export const Aside = styled.aside`
  max-width: 300px;
  width: 100%;
`

export const Buttons = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

export const PageButton = styled(Button)`
  width: 140px;
`