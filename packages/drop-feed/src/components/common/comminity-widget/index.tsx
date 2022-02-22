import React, { FC } from 'react'
import {
  Widget,
  WidgetImage,
  WidgetTitle,
  WidgetText,
  WidgetIcon,
  WidgetIconBlank,
  WidgetButton
} from './styled-components'


type TCommunityWidget = {
  title: string,
  description: string,
  action: () => void,
  image?: string | undefined,
  icon?: React.ReactNode,
  buttonTitle: string,
  inverted?: boolean,
  disabled?: boolean
}
const CommunityWidget: FC<TCommunityWidget> = ({ title, description, disabled, action, buttonTitle, inverted, image, icon }) => {
  const defineIcon = (icon?: React.ReactNode, image?: string, title?: string) => {
    if (icon) { return <WidgetIcon>{icon}</WidgetIcon>}
    if (image && title) {
      return <WidgetImage src={image} alt={title} />
    }
    if (title) {
      return <WidgetIcon>
        <WidgetIconBlank />
      </WidgetIcon>
    }
  }
 
  return <Widget inverted={inverted}>
    {defineIcon(icon, image, title)}
    <WidgetTitle>{title}</WidgetTitle>
    <WidgetText>{description}</WidgetText>
    <WidgetButton
      disabled={disabled}
      onClick={action}
      appearance={inverted ? 'default-inverted' : 'default'}
      title={buttonTitle}
    />
  </Widget>
}

export default CommunityWidget