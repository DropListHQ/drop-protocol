import React, { FC } from 'react'
import {
    Button,
    ButtonLoader
} from './styled-components'

import { ThemeProvider } from 'styled-components'
import themes from 'themes'

interface Props {
    title: string,
    disabled?: boolean,
    loading?: boolean,
    size?: 'small' | 'default',
    onClick: () => void,
    appearance?: 'inverted' | 'gradient' | 'default',
    className?: string
}

const ButtonComponent: FC<Props> = ({
  size = 'default',
  title,
  disabled = false,
  loading = false,
  onClick,
  appearance = 'default',
  className
}) => {
    return <ThemeProvider theme={themes.light}>
      <Button
        size={size}
        disabled={disabled}
        loading={loading}
        onClick={onClick}
        appearance={appearance}
        className={className}
      >
        {loading && <ButtonLoader size='small' />}{title}
      </Button>
    </ThemeProvider>
}


export default ButtonComponent