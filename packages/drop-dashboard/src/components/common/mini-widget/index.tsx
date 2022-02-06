import React, { FC } from 'react'

import {
  MiniWidget,
  MiniWidgetTitle,
  MiniWidgetDescription,
  ButtonComponent,
  Buttons
} from './styled-components'

import { ThemeProvider } from 'styled-components'
import themes from 'themes'


interface Props {
  title: string,
  subtitle?: string,
  buttonTitle: string,
  description?: string,
  action: () => void
}

const MiniWidgetComponent: FC<Props> = ({
  title,
  buttonTitle = 'Create',
  action = () => console.log('hello world!'),
  description,
}) => {
    const button = <ButtonComponent
      title={buttonTitle}
      onClick={action}
      appearance='inverted'
    />
  
    return <ThemeProvider theme={themes.light}>
      <MiniWidget>
        <MiniWidgetTitle>{title}</MiniWidgetTitle>
        <MiniWidgetDescription>{description}</MiniWidgetDescription>
        <Buttons>{button}</Buttons>
      </MiniWidget>
    </ThemeProvider>
}

export default MiniWidgetComponent
