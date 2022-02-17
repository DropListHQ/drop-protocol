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
  buttonTitle: string,
  description?: string,
  logo?: React.ReactNode,
  action: () => void
}

const MiniWidgetComponent: FC<Props> = ({
  title,
  buttonTitle = 'Create',
  action = () => console.log('hello world!'),
  logo,
  description,
}) => {
    const button = <ButtonComponent
      title={buttonTitle}
      onClick={action}
      appearance='default'
    />
  
    return <ThemeProvider theme={themes.light}>
      <MiniWidget>
        <MiniWidgetTitle>{title}{logo}</MiniWidgetTitle>
        <MiniWidgetDescription>{description}</MiniWidgetDescription>
        <Buttons>{button}</Buttons>
      </MiniWidget>
    </ThemeProvider>
}

export default MiniWidgetComponent
