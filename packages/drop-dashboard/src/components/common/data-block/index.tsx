import React, { FC } from 'react'
import {
  DataBlockTitle,
  DataBlockText,
  DataBlock
} from './styled-components'

interface Props {
  title: string | number,
  text: string | number,
  className?: string
}

const DataBlockComponent: FC<Props> = ({
  title,
  text,
  className
}) => {
  return <DataBlock className={className}>
    <DataBlockTitle>{title}</DataBlockTitle>
    <DataBlockText>{text}</DataBlockText>
  </DataBlock>
}

export default DataBlockComponent