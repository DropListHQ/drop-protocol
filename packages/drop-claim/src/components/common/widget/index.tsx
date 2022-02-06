import React, { FC } from 'react'
import { WidgetContainer, WidgetBody } from './styled-components'

type TProps = {
  image?: React.ReactNode
}

const Widget: FC<TProps> = ({ children, image }) => {
  return <WidgetContainer>
    {image}
    <WidgetBody>
      {children}
    </WidgetBody>
  </WidgetContainer>
}

export default Widget