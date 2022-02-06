import React, { FC } from 'react'
import { shortenString } from 'helpers'
import {
    Header,
		Address,
		AddressIndicator,
		Logo
} from './styled-components'
import { ThemeProvider } from 'styled-components'
import themes from 'themes'

interface Props {
  title: string | React.ReactNode;
	address: string;
}

const HeaderComponent: FC<Props> = ({ title, address }) => {
	return <ThemeProvider theme={themes.light}>
		<Header withAddress={Boolean(address)}>
			<Logo>{title}</Logo>
			{address && <Address>
				<AddressIndicator />
				{shortenString(address)}
			</Address>}
		</Header>
	</ThemeProvider>
}


export default HeaderComponent