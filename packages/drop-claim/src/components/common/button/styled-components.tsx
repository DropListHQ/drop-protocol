import styled, { css } from 'styled-components';
import Loader from '../loader'

interface ButtonProps {
  disabled: boolean,
  loading: boolean,
  size: 'small' | 'default',
  appearance: 'gradient' | 'inverted' | 'default',
  className?: string
}

export const ButtonLoader = styled(Loader)`
  margin-right: 8px;
`

export const Button = styled.button.attrs(props => ({
  className: props.className
}))<ButtonProps>`
  background-color: ${props => props.theme.buttonDefaultColor};
  color: ${props => props.theme.secondaryTextColor};
  font-size: 12px;
  cursor: pointer;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  border-radius: 20px;
  transition: color .3s, background-color .3s;
  border: 2px solid ${props => props.theme.buttonDefaultColor};

  ${props => props.size && props.size === 'small' && css`
    font-size: 12px;
    padding: 4px 8px;
    border-width: 1px;
  `}

  ${props => props.appearance === 'inverted' && css`
    background-color: transparent;
    border-color: ${props.theme.buttonDefaultColor};
    color: ${props.theme.buttonDefaultColor};
  `}

  ${props => props.disabled && (props.appearance === 'default' || props.appearance === 'gradient') && css`
    background-color: ${props.theme.buttonDisabledColor};
    border-color: ${props.theme.buttonDisabledColor};
    color: ${props.theme.buttonDisabledTextColor};
  `}

  ${props => props.appearance === 'gradient' && css`
    background: ${props => props.theme.buttonGradient};
    background-size: 200%;
    background-position: left top;
    transition: background-position .3s;
    border: none;
    color: ${props => props.theme.secondaryTextColor};
  `}

  ${props => !props.disabled && props.appearance === 'gradient' && css`
    &:hover {
      background-position: right top;
    }
    &:active {
      background-position: center center;
    }
  `}

  ${props => !props.disabled && props.appearance === 'default' && css`
    &:hover {
      border-color: ${props.theme.buttonHoverColor};
      background-color: ${props.theme.buttonHoverColor};
    }
    &:active {
      border-color: ${props.theme.buttonActiveColor};
      background-color: ${props.theme.buttonActiveColor};
    }
  `}

  ${props => !props.disabled && props.appearance === 'inverted' && css`
    &:hover {
      border-color: ${props.theme.buttonHoverColor};
      color: ${props.theme.buttonHoverColor};
    }
    &:active {
      border-color: ${props.theme.buttonActiveColor};
      color: ${props.theme.buttonActiveColor};
    }
  `}

  ${props => props.disabled && props.appearance === 'inverted' && css`
    background-color: transparent;
    border-color: ${props.theme.buttonDisabledColor};
    color: ${props.theme.buttonDisabledTextColor};
  `}

  ${props => props.disabled && css`
    cursor: not-allowed;
  `}
`;


