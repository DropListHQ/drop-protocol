import { FC, useEffect, useState } from 'react'
import {
  Wrapper,
  Content,
  Text
} from './styled-components'
import { secondsToDhms } from 'helpers'
type TTimer = { hours: string; days: string; minutes: string }
type TProps = {
  finishDate: Date,
  className?: string
}
const Timer: FC<TProps> = ({ finishDate, className }) => {
  const [ timer, setTimer ] = useState<TTimer>({
    hours: '0h', days: '0d', minutes: '0m'
  })
  useEffect(() => {
    const intervalCB = () => {
      const currentDate = new Date()
      const left = (Number(finishDate) - Number(currentDate)) / 1000
      const { hours, days, minutes } = secondsToDhms(left)
      console.log({ hours, days, minutes })
      if (hours === '0h' && days === '0d' && minutes === '0m') {
        return window.clearInterval(interval)
      }
      setTimer({ hours, days, minutes })
    }
    const interval = window.setInterval(intervalCB, 1000)

    return () => {
      window.clearInterval(interval)
    }
  }, [])
  

  return <Wrapper className={className}>
    <Content>
      <Text>{timer.days}</Text>
      <Text>{timer.hours}</Text>
      <Text>{timer.minutes}</Text>
    </Content>
  </Wrapper>
}

export default Timer