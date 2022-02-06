import React, { FC } from 'react'

import {
	FooterComponent
	// @ts-ignore
} from './styled-components.tsx'
import Icons from 'icons'

import { ThemeProvider } from 'styled-components'
import themes from 'themes'

interface FooterProps {
	className?: string
}

const Footer: FC<FooterProps> = ({ className }) => {
	return <ThemeProvider theme={themes.light}>
		<FooterComponent className={className}>
			Powered by <span><Icons.DroplistLogo /></span> DropList
		</FooterComponent>
	</ThemeProvider>
}

export default Footer