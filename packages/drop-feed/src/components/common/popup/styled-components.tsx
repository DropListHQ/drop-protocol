import styled from 'styled-components'
import Icons from 'icons'

export const PopupWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.424);
  position: fixed;
  z-index: 100;
`

export const PopupContent = styled.div`
  max-width: 660px;
  padding: 24px;
  border-radius: 20px;
  position: relative;
  width: 100%;
  background: ${props => props.theme.blankColor};
`

export const PopupTitle = styled.h3`
  font-size: 34px;
  margin: 0 0 36px;
`

export const PopupClose = styled(Icons.PopupCloseIcon)`
  position: absolute;
  top: 38px;
  right: 44px;
  cursor: pointer;
`