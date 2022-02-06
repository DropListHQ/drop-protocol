import React, { FC } from 'react'
import cn from 'classnames'
import {
  LaunchButton
} from './styled-components.js'

import { ThemeProvider } from 'styled-components'
import themes from 'themes'

interface Props {
    title: string,
    onClick: () => void
}

const LaunchButtonComponent: FC<Props> = ({
  title,
  onClick
}) => {
    return <ThemeProvider theme={themes.light}>
      <LaunchButton
        onClick={onClick}
      >
        {title}
      </LaunchButton>
    </ThemeProvider>
}


export default LaunchButtonComponent