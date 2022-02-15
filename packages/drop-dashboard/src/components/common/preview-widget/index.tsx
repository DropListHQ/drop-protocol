import {
  PreviewWidget,
  PreviewWidgetDescription,
  PreviewWidgetImage,
  PreviewWidgetTitle,
  PreviewWidgetLabel,
  PreviewWidgetButton,
  PreviewWidgetBlank
} from './styled-components'
import { FC, useEffect, useState } from 'react'
import { getValidImage } from 'helpers'
import dropPlaceholder from 'images/drop-placeholder.png'

type TProps = {
  image?: string;
  title?: string;
  description?: string;
}


const PreviewWidgetComponent: FC<TProps> = ({
  image,
  title,
  description
}) => {
  const [ actualImage, setActualImage ] = useState(dropPlaceholder)

  useEffect(() => {
    const checkImage = async () => {
      if (!image) { return }
      const newImage = await getValidImage(image, true)
      if (actualImage === newImage) { return }
      setActualImage(newImage)
    }
    checkImage()
  }, [image])

  return <PreviewWidget>
    <PreviewWidgetLabel>Claim page preview</PreviewWidgetLabel>
    {actualImage ? <PreviewWidgetImage
      src={actualImage}
      alt={title}
    /> : <PreviewWidgetBlank />}
    <PreviewWidgetTitle>{title}</PreviewWidgetTitle>
    <PreviewWidgetDescription>{description}</PreviewWidgetDescription>
    <PreviewWidgetButton disabled title='Claim now' onClick={() => {}} />
  </PreviewWidget>
}

export default PreviewWidgetComponent