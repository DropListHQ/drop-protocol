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
  onClick: () => void,
  appearance?: 'action' | 'action-inverted' | 'default' | 'default-inverted',
  className?: string,
  size?: 'default' | 'small'
}

const ButtonComponent: FC<Props> = ({
  title,
  disabled = false,
  loading = false,
  onClick,
  appearance = 'default',
  className,
  size
}) => {
    return <ThemeProvider theme={themes.light}>
      <Button
        disabled={disabled}
        loading={loading}
        onClick={onClick}
        appearance={appearance}
        className={className}
        size={size}
      >
        {loading && <ButtonLoader size='small' />}{title}
      </Button>
    </ThemeProvider>
}


export default ButtonComponent