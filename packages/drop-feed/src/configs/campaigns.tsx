import { ICampaign, ICampaignDetails } from "types"
import LedgerIcon from 'images/ledger.png'
import CampaignImage from 'images/1.png'
import CommunityIcon from 'images/community.png'

export const campaigns: ICampaign[] = [{
  title: 'Dedication to the glorious naked parties in Acapulco',
  short_description: 'Do you remember those times we were young, naked and happy? We do. And Super Co. App does. Complete all tasks from the list and get a chance to win Cryptoad 3752.',
  chain_id: 4,
  campaign_address: '0x3F389A7d841EdBa3964Ebd5acCbaf76f7525B3bE',
  owner: {
    name: 'Ledger',
    id: '1',
    logo: LedgerIcon
  },
  image: CampaignImage,
  communities: [
    {
      address: '0x35573543f290fef43d62ad3269bb9a733445ddab',
      logo: CommunityIcon,
      name: "Bored Ape"
    }
  ],
  status: 'active',
  prize: {
    token_address: '0x35573543f290fef43d62ad3269bb9a733445ddab',
    token_id: 5,
    token_type: 'erc1155',
    collection_name: 'Cryptoadz'
  }
}]

export const campaign: ICampaignDetails = {
  ...campaigns[0],
  date: '2022-03-22T13:45:24.583Z',
  description: 'Toad everyone is a raffle organized by Ladger. In order to win the main prize — cryptoad 3752, follow the instruction: Make a swap for 1 ETH in ledger live. link Mint ticket here. If you are not eligible to claim ticket then you can buy tickets on a secondary market.',
  ticket: {
    total: 50,  
    token_address: '0x35573543f290fef43d62ad3269bb9a733445ddab',
    type: 'erc721'
  }
}

