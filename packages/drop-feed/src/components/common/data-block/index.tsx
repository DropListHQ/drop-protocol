import React, { FC } from 'react'
import {
  DataBlockTitle,
  DataBlockText,
  DataBlock,
  DataBlockLink
} from './styled-components'
import Icons from 'icons';

interface Props {
  title: string | number,
  text: string | number | React.ReactNode,
  link?: string,
  className?: string
}

const DataBlockComponent: FC<Props> = ({
  title,
  text,
  className,
  link
}) => {
  return <DataBlock className={className}>
    <DataBlockTitle>{title}</DataBlockTitle>
    <DataBlockText>
      {link ? <DataBlockLink target='_blank' rel='noreferrer' href={link}>{text}<Icons.ExternalLinkIcon /></DataBlockLink>: text}
    </DataBlockText>
  </DataBlock>
}

export default DataBlockComponent