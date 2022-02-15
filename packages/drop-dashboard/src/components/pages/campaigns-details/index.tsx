import { FC, useState } from 'react'
import { Breadcrumbs, Button } from 'components/common'
// import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'data/store';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Link, LinkContainer, LinkValue, LinkTitle, WidgetDataBlock, InfoBlockStyled, WidgetDataSplit, InfoBlockContainer, Description, WidgetContainer } from './styled-components'
import { copyToClipboard, shortenString } from 'helpers'
import { useHistory } from 'react-router-dom'
import { defineNetworkName, capitalize, defineEtherscanUrl } from 'helpers'
import { TRecipientsData, TRetroDropType } from 'types'
import { countTotalTokens } from 'helpers'
const ipfsGatewayUrl = 'https://gateway.pinata.cloud/ipfs/'

const { REACT_APP_CLAIM_URL } = process.env

type TReduceTokens = {
  [tokenId: string]: number
}

type TMapTokensIds = string[]

interface MatchParams {
  id: string;
}

interface IProps extends RouteComponentProps<MatchParams> {
  connectWallet: () => void;
}

const mapStateToProps = ({
  drops: { retroDrops },
  user: { address },
  newRetroDrop: { decimals },
  communities: { communities }
}: RootState) => ({
  retroDrops,
  address,
  decimals,
  communities
})

type ReduxType = ReturnType<typeof mapStateToProps>

const defineTokenTexts = (recipients: TRecipientsData, type: TRetroDropType, decimals: number | null) => {
  if (type === 'erc1155') {
    const tokens = recipients && Object.values(recipients).reduce<TReduceTokens>((sum, item) => {
      const tokenId = item.tokenId.length > 10 ? shortenString(item.tokenId) : item.tokenId
      sum[tokenId] = (sum[tokenId] || 0) + Number(item.amount)
      return sum
    }, {})

    return <WidgetDataSplit>
      <WidgetDataBlock title='Token ID' text={Object.keys(tokens).join(', ')} />
      <WidgetDataBlock title='Total amount' text={Object.values(tokens).reduce((a, b) => a + b, 0)} />
    </WidgetDataSplit>
  }

  if (type === 'erc721') {
    const tokens = recipients && Object.values(recipients).map<TMapTokensIds>((item) => {
      return item.tokenId.length > 10 ? shortenString(item.tokenId) : item.tokenId
    })
    return <WidgetDataSplit>
      <WidgetDataBlock title='Token ID' text={tokens.join(', ')} />
    </WidgetDataSplit>
  }

  if (type === 'erc20') {
    const tokensAmount = countTotalTokens(recipients, 'erc20', decimals)
    return <WidgetDataSplit>
      <WidgetDataBlock title='Total amount' text={tokensAmount} />
    </WidgetDataSplit>
  }

  
}

const CampaignDetails: FC<ReduxType & IProps & RouteComponentProps> = (props) => {
  const { retroDrops, match: { params } } = props
  const [ copied, setCopied ] = useState(false)
  const history = useHistory()

  const currentCampaign = retroDrops.find(item => item.ipfsHash === params.id)
  if (!currentCampaign) {
    return null
  }
  const { ipfsHash, recipients, title, chainId, tokenAddress, type, decimals, dropAddress } = currentCampaign
  const link = `${REACT_APP_CLAIM_URL}/${ipfsHash}`
  
  

  return <div>
    <Breadcrumbs
      path={['My campaigns', currentCampaign.title]}
      description='Manage your campaign and gain insights into your conversion. Share the link to your claim page.'
      returnAction={() => history.push('/')}
    />
    <InfoBlockContainer>
      {recipients && <InfoBlockStyled
        title='Unique Wallets'
      >
        {Object.keys(recipients).length}
      </InfoBlockStyled>}
    </InfoBlockContainer>
    <Description>
      <WidgetContainer>
        <WidgetDataBlock title='Drop’s title' text={title} />
        <WidgetDataSplit>
          <WidgetDataBlock title='Network' text={capitalize(defineNetworkName(chainId))} />
          <WidgetDataBlock title='Type of token' text={type.toUpperCase()} />
        </WidgetDataSplit>
        <WidgetDataBlock title='Token address' text={tokenAddress} />
        {dropAddress && <WidgetDataBlock
          title='Drop contract'
          text={dropAddress}
          link={defineEtherscanUrl(chainId, dropAddress)}
        />}
        <WidgetDataBlock title='IPFS hash' text={shortenString(ipfsHash)} link={`${ipfsGatewayUrl}${ipfsHash}`} />
        {defineTokenTexts(recipients, type, decimals)}
      </WidgetContainer>

      <LinkContainer>
        <LinkTitle>Link to claimpage</LinkTitle>
        <Link>
          <LinkValue>{link}</LinkValue>
          <Button
            title={copied ? 'Copied!' : 'Copy Link'}
            size='small'
            appearance='action'
            onClick={() => {
              copyToClipboard({ value: link })
              setCopied(true)
            }}
          />
        </Link>
      </LinkContainer>
    </Description>
  </div>
}

export default withRouter(connect(mapStateToProps)(CampaignDetails))

