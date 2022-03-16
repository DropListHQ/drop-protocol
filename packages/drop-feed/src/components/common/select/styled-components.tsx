import styled, { css } from 'styled-components'

export const Select = styled.div`
  position: relative;
  border-radius: 20px;
  border: 1px solid ${props => props.theme.primaryBorderColor};
  max-width: 140px;
  font-size: 12px;
  font-weight: 700;
  height: 36px;
  display: flex;
  user-select: none;
  cursor: pointer;
`

export const SelectMenu = styled.ul`
  position: absolute;
  padding: 16px 0;
  margin: 0;
  border-radius: 20px;
  top: 100%;
  width: 100%;
  list-style: none;
  left: 0;
  background: ${props => props.theme.blankColor};
  border: 1px solid ${props => props.theme.primaryBorderColor};
  transform: translateY(18px);
  z-index: 2;
`

type YSelectSelected = {
  opened: boolean
}

export const SelectSelected = styled.div<YSelectSelected>`
  font-size: 12px;
  font-weight: 700;
  align-self: center;
  text-align: center;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    transition: all .3s;
    transform-origin: center;
    align-self: center;
    margin-left: 6px;
  }

  ${props => props.opened && css`
    svg {
      transform: rotate(180deg);
    }
  `}
`

export const SelectMenuItem = styled.li`
  padding: 0 16px;
  height: 24px;
  line-height: 24px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.tagDefaultColor};
  }
`


export const SelectContainerClass = 'SelectContainerClass'