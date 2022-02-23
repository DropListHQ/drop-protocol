import { FC, useEffect, useState } from 'react'
import {
  Drop,
  DropTitle,
  DropImage,
  DropDescription,
  DropContent,
  DropContract,
  DropInfo,
  DropTagsContainer
} from './styled-components'
import { getValidImage } from 'helpers'
import { TRetroDropType } from 'types'
import { Tag } from 'components/common'
import { defineNetworkName, shortenString } from 'helpers'

const { REACT_APP_CLAIM_URL } = process.env



type TProps = {
  title: string,
  image: string,
  id: string,
  description: string,
  chainId: number,
  type: TRetroDropType,
  address?: string
}

const DropComponent: FC<TProps> = ({
  title,
  image,
  id,
  type,
  chainId,
  description,
  address
}) => {
  const [ imageURL, setImageURL ] = useState(image)
  console.log({ imageURL })
  // useEffect(() => {
  //   const defineImage = async () => {
  //     const image = await getValidImage(imageURL)
  //     if (image === imageURL) { return }
  //     console.log({ image })
  //     setImageURL(image)
  //   }
  //   defineImage()
  // }, [])
  return <Drop>
    <DropImage src={imageURL} alt={title} address={address} />
    <DropContent>
      <DropInfo>
        <DropContract>
          Contract: <span>{shortenString(id)}</span>
        </DropContract>
        <DropTagsContainer>
          <Tag title={defineNetworkName(chainId)} status='default'/>
          <Tag title={type.toUpperCase()} status='default'/>
        </DropTagsContainer>
      </DropInfo>
      <DropTitle>{title}</DropTitle>
      <DropDescription>{description}</DropDescription>
    </DropContent>
  </Drop>
}

export default DropComponent