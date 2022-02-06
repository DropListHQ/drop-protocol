import React, { FC } from 'react'
import {
    Header,
    HeaderTitle,
    HeaderInfo,
    HeaderUseInfo,
		HeaderMenu,
		HeaderMenuItem,
		HeaderMenuItemActiveClass,
		HeaderLogoLink,
		ConnectionIndicator
		// @ts-ignore
} from './styled-components.tsx'
import { Dispatch } from 'redux';

import { ThemeProvider } from 'styled-components'
import themes from 'themes'
import Icons from 'icons'
import { shortenString, defineNetworkName, capitalize } from 'helpers'
import { RootState } from 'data/store';
import { connect } from 'react-redux';
import * as asyncUserActions from 'data/store/reducers/user/async-actions'
import { UserActions } from 'data/store/reducers/user/types'

const mapStateToProps = ({ user: { chainId, address } }: RootState) => ({ chainId, address })

const mapDispatcherToProps = (dispatch: Dispatch<UserActions>) => {
  return {
    connectWallet: () => asyncUserActions.connectWallet(dispatch)
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

interface Props {}

const HeaderComponent: FC<Props & ReduxType> = ({ chainId, address, connectWallet }) => {
	return <ThemeProvider theme={themes.light}>
			<Header>
				<HeaderTitle>
					<HeaderLogoLink to='/'><Icons.LinkdropLogo />DropList</HeaderLogoLink>
				</HeaderTitle>
				<HeaderMenu>
					<HeaderMenuItem
						to='/'
						exact
						activeClassName={HeaderMenuItemActiveClass}
					>
						My campaigns
					</HeaderMenuItem>

					<HeaderMenuItem
						exact
						to='/communities'
						activeClassName={HeaderMenuItemActiveClass}
					>
						Communities
					</HeaderMenuItem>
				</HeaderMenu>
				<HeaderInfo>
					{chainId && <HeaderUseInfo>
						{capitalize(defineNetworkName(chainId))}
					</HeaderUseInfo>}
					{address && <HeaderUseInfo>
						<ConnectionIndicator />
						{shortenString(address)}
					</HeaderUseInfo>}
					{!address && <HeaderUseInfo onClick={connectWallet}>
						Connect
					</HeaderUseInfo>}
				</HeaderInfo>
			</Header>
	</ThemeProvider>
}


export default connect(mapStateToProps, mapDispatcherToProps)(HeaderComponent)