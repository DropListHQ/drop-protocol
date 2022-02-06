import React, { FC } from 'react'
import { Container, Title, Subtitle, ContainerFooter } from './styled-components'
import { ThemeProvider } from 'styled-components'
import themes from 'themes'

type TProps = {
  title: string,
  subtitle: string,
  image: string
}


const CoverPage: FC<TProps> = ({
  title,
  subtitle,
  image
}) => {
  return <ThemeProvider theme={themes.light}>
    <Container image={image}>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      <ContainerFooter />
    </Container>
  </ThemeProvider>
}

export default CoverPage