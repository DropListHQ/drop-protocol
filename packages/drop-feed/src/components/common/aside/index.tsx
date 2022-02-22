import React, { FC } from 'react'

import {
	Aside,
	AsideFooter,
	AsideLogoZone,
	AsideMenu,
	AsideMenuItem,
	AsideLogoIcon,
	AsideMenuItemIconClassName
	// @ts-ignore
} from './styled-components.tsx'

import { ThemeProvider } from 'styled-components'
import themes from 'themes'
import Icons from 'icons'

interface AsideProps {}

const AsideComponent: FC<AsideProps> = () => {
	return <ThemeProvider theme={themes.light}>
		<Aside>
			<AsideLogoZone>
				<AsideLogoIcon>
					<Icons.LinkdropLogo />
				</AsideLogoIcon>
				{false && <Icons.LinkdropTextLogo />}
			</AsideLogoZone>

			<AsideMenu>
				<AsideMenuItem to='/retroactive-drops' active>
					<Icons.StarMenuIcon className={AsideMenuItemIconClassName} />
					Retroactive drops
				</AsideMenuItem>
			</AsideMenu>

			<AsideFooter>
				<AsideMenu>
					<AsideMenuItem disabled>
						<Icons.SupportMenuIcon className={AsideMenuItemIconClassName} />
						Support
					</AsideMenuItem>
					<AsideMenuItem disabled>
						<Icons.FaqMenuIcon className={AsideMenuItemIconClassName} />
						FAQ
					</AsideMenuItem>
					<AsideMenuItem disabled>
						<Icons.DocsMenuIcon className={AsideMenuItemIconClassName} />
						Legal
					</AsideMenuItem>
				</AsideMenu>
			</AsideFooter>

		</Aside>
	</ThemeProvider>
}

export default AsideComponent