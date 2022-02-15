import styled from 'styled-components';

interface TextareaContainerProps {
  disabled: boolean,
  error?: string,
  className?: string
}

export const TextareaContainer = styled.div.attrs(props => ({
  className: props.className
}))<TextareaContainerProps>`
  
`

export const TextareaTitle = styled.h3`
  margin-bottom: 4px;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  color: ${props => props.theme.primaryTextColor};
`

export const TextareaFieldContainer = styled.div`
  position: relative;
`

export const TextareaFieldLimit = styled.div`
  position: absolute;
  bottom: 12px;
  right: 16px;
  font-size: 12px;
`

type TTextareaFieldProps = {
  limit?: number
}

export const TextareaField = styled.textarea<TTextareaFieldProps>`
  color: ${props => props.theme.primaryTextColor};
  font-size: 14px;
  width: 100%;
  min-height: 125px;
  font-family: Inter;
  resize: none;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  padding: 12px 11px;
  border: 2px solid ${props => props.theme.primaryBorderColor};
  border-radius: 8px;

  &:focus {
    border-color: ${props => props.theme.primaryHighlightColor};
    outline: none;
  }
`

export const TextareaError = styled.div`
  margin-top: 6px;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  color: ${props => props.theme.dangerTextColor};
`