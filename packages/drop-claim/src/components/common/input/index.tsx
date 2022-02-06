import React, { FC } from 'react'

import {
    InputContainer,
    InputField,
    InputTitle,
    InputError,
    InputInfo
} from './styled-components'

import { ThemeProvider } from 'styled-components'
import themes from 'themes'

// type InputEvent = React.ChangeEvent<HTMLInputElement>;


interface Props {
  title?: string,
  placeholder?: string,
  type?: string,
  name?: string,
  disabled?: boolean,
  onChange: (value: string) => string,
  error?: string,
  value: string,
  className?: string,
  info?: string
}

const InputComponent: FC<Props> = ({
  placeholder,
  title,
  disabled = false,
  type = 'text',
  onChange,
  error,
  name,
  value = '',
  className,
  info
}) => {
    return <ThemeProvider theme={themes.light}>
      <InputContainer
        disabled={disabled}
        error={error}
        className={className}
      >
        <InputTitle error={error} active={value.length > 0}>{title}</InputTitle>
        <InputField
          onChange={(evt) => onChange(evt.target.value)}
          type={type}
          error={error}
          disabled={disabled}
          placeholder={placeholder}
          value={value}
        />
        {error && <InputError>{error}</InputError>}
        {info && <InputInfo>{info}</InputInfo>}
      </InputContainer>
    </ThemeProvider>
}

export default InputComponent
