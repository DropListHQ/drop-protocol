import React, { FC } from 'react'
import {
  TagContainer
} from './styled-components'

interface Props {
  title: string,
  status: 'error' | 'info' | 'default'
}

const Tag: FC<Props> = ({
  title,
  status
}) => <TagContainer status={status}>{title}</TagContainer>

export default Tag