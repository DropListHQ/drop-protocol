import { FC, useRef } from 'react'
import {
  PopupWrapper,
  PopupContent,
  PopupTitle,
  PopupClose
} from './styled-components'


type TProps = {
  title: string;
  onClose: () => void
}

const Popup: FC<TProps> = ({
  children,
  title,
  onClose
}) => {
  const wrapperRef = useRef(null)
  return <PopupWrapper ref={wrapperRef} onClick={event => {
    if (wrapperRef.current === event.target) {
      onClose && onClose()
    }
  }}>
    <PopupContent>
      <PopupClose onClick={onClose} />
      {title && <PopupTitle>{title}</PopupTitle>}
      {children}
    </PopupContent>
  </PopupWrapper>
}

export default Popup