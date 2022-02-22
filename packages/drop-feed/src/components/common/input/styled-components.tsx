import styled, { css } from 'styled-components';

interface InputContainerProps {
  disabled: boolean,
  error?: string,
  className?: string
}

interface InputFieldProps {
  value: string
}

interface InputTitleProps {
}

export const InputContainer = styled.div.attrs(props => ({
  className: props.className
}))<InputContainerProps>`
  margin-bottom: 24px;
`


export const InputTitle = styled.h3<InputTitleProps>`
  margin-bottom: 4px;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  margin-top: 0px;
  color: ${props => props.theme.primaryTextColor};
`


export const InputField = styled.input<InputFieldProps>`
  color: ${props => props.theme.primaryTextColor};
  font-size: 14px;
  width: 100%;
  line-height: 1;
  padding: 12px 16px;
  border: 2px solid;
  border-color: ${props => props.theme.primaryBorderColor};
  border-radius: 8px;
  transition: border-color .3s;
  outline: none;

  &:focus {
    border-color: ${props => props.theme.primaryHighlightColor};
    outline: none;
  }
`

export const InputError = styled.div`
  margin-top: 6px;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  color: ${props => props.theme.dangerTextColor};
`