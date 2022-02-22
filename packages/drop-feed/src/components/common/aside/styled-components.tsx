import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom'

export const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  width: 245px;
  background-color: ${props => props.theme.secondaryColor};
`

export const AsideLogoZone = styled.div`
  display: flex;
  align-items: center;
  padding: 18px 24px 50px;
  min-height: 100px;
`
export const AsideLogoIcon = styled.div`
  margin-right: 16px;
`

export const AsideMenu = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  width: 100%;
`

interface AsideMenuItemProps {
  active: boolean;
  disabled: boolean;
}

export const AsideMenuItemIconClassName = 'AsideMenuItemIcon'

export const AsideMenuItem = styled(Link)<AsideMenuItemProps>`
  margin: 0;
  min-height: 56px;
  color: ${props => props.theme.secondaryTextColor};
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 20px 32px;
  line-height: 1;
  cursor: pointer;
  transition: background-color .3s;

  &:hover {
    ${props => !props.disabled && css`
      background-color: ${props => props.theme.menuItemActive};
      border-left: 3px solid ${props => props.theme.secondaryBorderColor};
      padding-left: 29px;
    `}
  }

  ${props => props.active && css`
    background-color: ${props => props.theme.menuItemActive};
    border-left: 3px solid ${props => props.theme.secondaryBorderColor};
    padding-left: 29px;
  `}

  ${props => props.disabled && css`
    opacity: .3;
    cursor: not-allowed;
  `}

  .${AsideMenuItemIconClassName} {
    margin-right: 24px;
  }
`


export const AsideFooter = styled.div`
  width: 100%;
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid ${props => props.theme.menuItemActive};
`