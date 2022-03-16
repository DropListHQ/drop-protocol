import React, { FC } from 'react'
import {
    Button,
    ButtonLoader,
    Anchor
} from './styled-components'

interface Props {
  title: string,
  disabled?: boolean,
  loading?: boolean,
  onClick?: () => void,
  appearance?: 'action' | 'action-inverted' | 'default' | 'default-inverted',
  className?: string,
  size?: 'default' | 'small',
  href?: string,
  target?: '_blank' | '_self' | '_parent' | '_top' 
}

const ButtonComponent: FC<Props> = ({
  title,
  disabled = false,
  loading = false,
  onClick,
  appearance = 'default',
  className,
  size,
  href,
  target
}) => {
    if (href) {
      return <Anchor href={href} target={target}>
        <Button
          disabled={disabled}
          appearance={appearance}
          className={className}
          size={size}
        >
          {title}
        </Button>
      </Anchor>
    }
    return <Button
      disabled={disabled}
      loading={loading}
      onClick={onClick}
      appearance={appearance}
      className={className}
      size={size}
    >
      {loading && <ButtonLoader size='small' />}{title}
    </Button>
}


export default ButtonComponent