import React, { FC, useEffect } from 'react'

import {
  MiniPopupContainer,
  MiniPopupContainerClass
} from './styled-components'

type Props = {
  onClose: () => void
}

const MiniPopup: FC<Props> = ({ children, onClose }) => {
  useEffect(() => {
    const callback = (evt: MouseEvent) => {
      const target = evt.target as HTMLDivElement
      if (!target) { return }
      const wasClickedOutside = !target.closest(`.${MiniPopupContainerClass}`)
      if (wasClickedOutside) { onClose() }
    }
    document.addEventListener('click', callback)

    return () => document.removeEventListener('click', callback)
  }, [])
  return <MiniPopupContainer className={MiniPopupContainerClass}>
    {children}
  </MiniPopupContainer>
}

export default MiniPopup