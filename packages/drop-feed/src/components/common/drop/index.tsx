import { FC, useEffect, useState } from 'react'
import {
  Drop,
  DropTitle,
  DropImage,
  DropDescription,
  DropContent,
  DropContract,
  DropInfo,
  DropLink,
  DropTagsContainer
} from './styled-components'
import { getValidImage } from 'helpers'
import { TDropType } from 'types'
import { Tag } from 'components/common'
import { defineNetworkName, shortenString } from 'helpers'

const { REACT_APP_CLAIM_URL } = process.env



type TProps = {
  title: string,
  image: string,
  id: string,
  description: string,
  chainId: number,
  type: TDropType,
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
    <DropLink to={`/drops/${id}`}>
      <DropImage src={imageURL} alt={title} address={address} />
    </DropLink>
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
      <DropLink to={`/drops/${id}`}><DropTitle>{title}</DropTitle></DropLink>
      <DropDescription>{description}</DropDescription>
    </DropContent>
  </Drop>
}

export default DropComponent