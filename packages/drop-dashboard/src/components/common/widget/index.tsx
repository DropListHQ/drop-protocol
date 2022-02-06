import React, { FC } from 'react'
import { WidgetComponent } from './styled-components'

interface Props {
  className?: string
}

const Widget: FC<Props> = ({ children, className }) => {
  return <WidgetComponent className={className}>
    {children}
  </WidgetComponent>
}

export default Widget