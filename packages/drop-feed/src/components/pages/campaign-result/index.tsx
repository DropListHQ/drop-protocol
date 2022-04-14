import { FC } from 'react'
import { Container, Image, Text, Title, ButtonItem } from './styled-components'

const CampaignResult: FC = () => {
  
  return <Container>
    <Image />
    <Title>Next time, bruh!</Title>
    <Text>
      You haven’t won the main prize 😐. But it’s not the last raffle you participate in. Subscribe to DropList TelegramBot and we will notify you when new drops and raffles are available to you
    </Text>
    <ButtonItem title='Subscribe to Telegram bot' appearance='action' />
    <ButtonItem title='Back to the raffle page' />

  </Container>
} 

export default CampaignResult