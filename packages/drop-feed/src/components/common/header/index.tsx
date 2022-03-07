import { FC, useState } from 'react'
import {
    Header,
    HeaderTitle,
    HeaderInfo,
    HeaderUserInfo,
		HeaderMenu,
		HeaderMenuItem,
		HeaderMenuItemActiveClass,
		HeaderLogoLink,
		ConnectionIndicator,
		MiniPopupCustomItem,
		NetworkIndicator,
		NetworkIndicatorClass,
		HeaderContent
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
import MiniPopup from '../mini-popup'
import chains from 'configs/chains'

const mapStateToProps = ({ user: { chainId, address, provider } }: RootState) => ({ chainId, address, provider })

const mapDispatcherToProps = (dispatch: Dispatch<UserActions>) => {
  return {
    connectWallet: () => asyncUserActions.connectWallet(dispatch),
		switchWallet: (provider: any, chainId: number) => asyncUserActions.switchWallet(dispatch, provider, chainId)
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

interface Props {}


const HeaderComponent: FC<Props & ReduxType> = ({ chainId, address, connectWallet, switchWallet, provider }) => {
	const [ showToggleChain, setShowToggleChain ] = useState(false)
	

	const chainsPopup = showToggleChain && <MiniPopup onClose={() => { setShowToggleChain(false) }}>
		{Object.keys(chains).map((chain: string) => {
			const currentChain = chains[Number(chain)]
			return <MiniPopupCustomItem onClick={() => {
				switchWallet(provider, Number(chain))
			}}>
				{currentChain.displayName}
				<NetworkIndicator className={NetworkIndicatorClass} selected={Number(chainId) === Number(chain)} />
			</MiniPopupCustomItem>
		})}
	</MiniPopup>

	return <ThemeProvider theme={themes.light}>
		<Header>
			<HeaderContent>
				<HeaderTitle>
					<HeaderLogoLink to='/'><Icons.LinkdropLogo />DropList</HeaderLogoLink>
				</HeaderTitle>
				<HeaderMenu>
					<HeaderMenuItem
						to='/'
						exact
						activeClassName={HeaderMenuItemActiveClass}
					>
						Feed
					</HeaderMenuItem>
				</HeaderMenu>
				<HeaderInfo>
					{chainId && <HeaderUserInfo onClick={() => {
						setShowToggleChain(!showToggleChain)
					}}>
						{capitalize(defineNetworkName(chainId))}
						{chainsPopup}
					</HeaderUserInfo>}
					{address && <HeaderUserInfo>
						<ConnectionIndicator />
						{shortenString(address)}
					</HeaderUserInfo>}
					{!address && <HeaderUserInfo onClick={connectWallet}>
						Connect
					</HeaderUserInfo>}
				</HeaderInfo>
			</HeaderContent>
		</Header>
	</ThemeProvider>
}


export default connect(mapStateToProps, mapDispatcherToProps)(HeaderComponent)