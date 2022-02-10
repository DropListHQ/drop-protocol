import React, { FC } from 'react'
import {
  BreadcrumbsComponent,
  Title,
  TitleContainer,
  Description,
  ReturnButton
} from './styled-components'
import Icons from 'icons'

type TProps = {
  path: string[],
  description?: string,
  returnAction?: () => void
}


type TDefineTitle = (path: string[]) => void 

const defineTitle: TDefineTitle = (path) => {
  if (path.length === 0) return <Title current>No title</Title>
  if (path.length === 1) return <Title current>{path[0]}</Title>
  return <TitleContainer>
    {path.map((item, idx) => {
      if (idx === path.length - 1) { return null }
      return <Title key={item}>{item} / </Title>
    })}
    <Title current>{path[path.length - 1]}</Title>
  </TitleContainer>
}

const Breadcrumbs: FC<TProps> = ({ returnAction, path, description, children }) => {
  return <BreadcrumbsComponent>
    {returnAction && <ReturnButton onClick={returnAction}>
      <Icons.GoBackIcon />Back
    </ReturnButton>}
    {defineTitle(path)}
    {description && <Description>{description}</Description>}
    {children}
  </BreadcrumbsComponent>
}

export default Breadcrumbs