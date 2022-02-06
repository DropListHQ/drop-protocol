import React, { FC } from 'react'

import {
    TextareaContainer,
    TextareaField,
    TextareaTitle,
    TextareaError,
    TextareaFieldContainer,
    TextareaFieldLimit
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
  className?: string,
  limit?: number 
}

const TextareaComponent: FC<Props> = ({
  placeholder,
  title,
  disabled = false,
  onChange,
  error,
  value = '',
  className,
  limit
}) => {

  const limitContainer = limit ? <TextareaFieldLimit>{value.length || 0}/{limit}</TextareaFieldLimit> : null
    return <ThemeProvider theme={themes.light}>
      <TextareaContainer
        disabled={disabled}
        error={error}
        className={className}
      >
        <TextareaTitle>{title}</TextareaTitle>
        <TextareaFieldContainer>
          <TextareaField
            onChange={(evt) => {
              if (limit && limit > 0) {
                if (Number(evt.target.value.length) > limit) {
                  return
                }
              }
              onChange(evt.target.value)
            }}
            disabled={disabled}
            placeholder={placeholder}
            value={value}
            limit={limit}
          />
          {limitContainer}
        </TextareaFieldContainer>
        
      </TextareaContainer>
      {error && <TextareaError>{error}</TextareaError>}
    </ThemeProvider>
}

export default TextareaComponent
