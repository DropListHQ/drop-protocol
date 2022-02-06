import React, { FC } from 'react'

import {
    TextareaContainer,
    TextareaField,
    TextareaTitle,
    TextareaError
} from './styled-components'

import { ThemeProvider } from 'styled-components'
import themes from 'themes'

// type InputEvent = React.ChangeEvent<HTMLInputElement>;


interface Props {
  title?: string,
  placeholder?: string,
  disabled?: boolean,
  onChange: (value: string) => string,
  error?: string,
  value: string,
  className?: string
}

const TextareaComponent: FC<Props> = ({
  placeholder,
  title,
  disabled = false,
  onChange,
  error,
  value = '',
  className
}) => {
    return <ThemeProvider theme={themes.light}>
        <TextareaContainer
          disabled={disabled}
          error={error}
          className={className}
        >
          <TextareaTitle>{title}</TextareaTitle>
          <TextareaField
            onChange={(evt) => onChange(evt.target.value)}
            disabled={disabled}
            placeholder={placeholder}
            value={value}
          />
        </TextareaContainer>
        {error && <TextareaError>{error}</TextareaError>}
    </ThemeProvider>
}

export default TextareaComponent
