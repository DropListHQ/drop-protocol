import { FC, useEffect, useState } from 'react'
import {
  Wrapper,
  Content,
  Text
} from './styled-components'
import moment from 'moment'
import { secondsToDhms } from 'helpers'

const eventDate = new Date(1646222887038)
eventDate.setDate(eventDate.getDate() + 1)


type TTimer = { hours: string; days: string; minutes: string }

const Timer: FC = () => {
  const [ timer, setTimer ] = useState<TTimer>({
    hours: '0h', days: '0d', minutes: '0m'
  })
  useEffect(() => {
    const intervalCB = () => {
      const currentDate = new Date()
      const left = moment(eventDate).diff(currentDate, 'seconds')
      const { hours, days, minutes } = secondsToDhms(left)
      console.log({ hours, days, minutes })
      if (hours === '0h' && days === '0d' && minutes === '0m') {
        window.clearInterval(interval)
      }
      setTimer({ hours, days, minutes })
    }
    const interval = window.setInterval(intervalCB, 1000)

    return () => {
      window.clearInterval(interval)
    }
  }, [])
  

  return <Wrapper>
    <Content>
      <Text>{timer.days}</Text>
      <Text>{timer.hours}</Text>
      <Text>{timer.minutes}</Text>
    </Content>
  </Wrapper>
}

export default Timer