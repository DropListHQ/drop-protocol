import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom'
import Container from '../container'

export const Header = styled.header`
  border-bottom: 1px solid ${props => props.theme.primaryBorderColor};
`;

type THeaderContentProps = {
  className?: string
}

export const HeaderContent = styled(Container)<THeaderContentProps>`
  display: flex;
  align-items: center;
  justify-items: space-between;
  width: 100%;
  height: 68px;
`;

export const HeaderTitle = styled.h2`
  color: ${props => props.theme.primaryTextColor};
  font-size: 16px;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 6px;
  }
`

export const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

export const HeaderMode = styled.div`
  margin-right: 16px;
  padding-right: 16px;
  border-right: 1px solid ${props => props.theme.primaryBorderColor};
  line-height: 20px;
  font-size: 14px;
`

export const HeaderLogoLink = styled(NavLink)`
  text-decoration: none;
  display: flex;
  align-items: center;
  color: ${props => props.theme.primaryTextColor};
`
export const ConnectionIndicator = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 16px;
  background-color: ${props => props.theme.tagSuccessColor};
  margin-right: 8px;
`

export const HeaderUserInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  min-width: 152px;
  border-radius: 20px;
  font-weight: 700;
  min-height: 36px;
  position: relative;
  text-align: center;
  user-select: none;
  justify-content: center;
  margin-right: 16px;
  border: 1px solid ${props => props.theme.primaryBorderColor};

  ${props => props.onClick && css`
    cursor: pointer;
  `}

  &:last-child {
    margin-right: 0px;
  }
`
export const HeaderMenu = styled.div`
  display: flex;
  padding: 0;
  margin: 0 0 0 74px;
`
export const HeaderMenuItemActiveClass = 'headerMenuItemActiveClass'

export const HeaderMenuItem = styled(NavLink)`
  color: ${props => props.theme.primaryTextColor};
  text-decoration: none;
  margin-right: 32px;
  line-height: 1;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  transition: background-color .3s;


  &.${HeaderMenuItemActiveClass} {
    text-decoration: underline;
  }
`

export const HeaderNetworkIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 100%;
  background: #FFF;
  
`
export const HeaderNetworkIconImg = styled.img`

`

export const NetworkIndicatorClass = 'NetworkIndicatorClass'

export const MiniPopupCustomItem = styled.div`
  font-size: 12px;
  margin-bottom: 8px;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  &:last-child {
    margin-bottom: 0px;
  }

  :hover {
    .${NetworkIndicatorClass} {
      background-color: ${props => props.theme.tagDefaultColor};
    }
  }
`

type TNetworkIndicatorProps = {
  selected: boolean
}

export const NetworkIndicator = styled.div<TNetworkIndicatorProps>`
  width: 8px;
  height: 8px;
  border-radius: 8px;
  background-color: transparent;
  ${props => props.selected && css`
    background-color: ${props => props.theme.primaryHighlightColor}!important;
  `}
`
