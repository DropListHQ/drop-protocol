import { useState, FC, useEffect } from 'react'
import {
  Breadcrumbs,
  TextLink
} from 'components/common'

import { TRetroDropStep, TRecipientsData } from 'types'
import { RootState } from 'data/store';
import * as newRetroDropActions from 'data/store/reducers/new-retro-drop/actions'

import { NewRetroDropActions } from 'data/store/reducers/new-retro-drop/types'
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import CampaignType from './campaign-type'
import CampaignInfo from './campaign-info'
import CampaignInitial from './campaign-initial'
import CampaignTree from './campaign-tree'
import CampaignDeploy from './campaign-deploy'
import CampaignApproval from './campaign-approval'
import { useHistory, useLocation } from 'react-router-dom'

function isValidStep(step: string | null): step is TRetroDropStep {
  if (!step) { return false }
  return ['initialize', 'create_tree',  'publish_ipfs', 'deploy_contract', 'give_approval', 'choose_type'].indexOf(step) !== -1;
}

const mapStateToProps = ({
  newRetroDrop: { step, type },
  user: { chainId }
}: RootState) => ({
  step,
  type,
  chainId
})

const mapDispatcherToProps = (dispatch: Dispatch<NewRetroDropActions>) => {
  return {
    clearDropData: () => dispatch(newRetroDropActions.clearNewRetroDrop())
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>
const defineTitie = (step: TRetroDropStep): string => {
  switch(step) {
    case 'choose_type':
      return 'Specify type of token to be airdropped:'
    case 'initialize':
      return 'Enter contract address of the tokens that you would like to distribute'
    case 'create_tree':
      return 'Enter recipient addresses and airdrop token IDs'
    case 'publish_ipfs':
      return 'Add details to your campaign and press Сontinue to upload your data to IPFS and proceed. Please note, it could take some time.'
    case 'deploy_contract':
      return 'Review details of your campaign and deploy it to the blockchain. Please note, deployment make take some time'
    case 'give_approval':
      return '🚀 Review details, give approval and launch campaign'
    default:
      return ''
  }
}

const definePreviousStep = (step: TRetroDropStep): TRetroDropStep => {
  switch(step) {
    case 'choose_type':
      return 'choose_type'
    case 'initialize':
      return 'choose_type'
    case 'create_tree':
      return 'initialize'
    case 'publish_ipfs':
      return 'create_tree'
    case 'deploy_contract':
      return 'publish_ipfs'
    case 'give_approval':
      return `deploy_contract`
    default:
      return 'choose_type'
  }
}

type defineStep = () => TRetroDropStep

const CampaignsCreate: FC<ReduxType> = ({
  chainId,
  clearDropData
}) => {  
  const [ recipients, setRecipients ] = useState<TRecipientsData>({})
  const [ dropTitle, setDropTitle ] = useState('')
  const [ dropLogoURL, setDropLogoURL ] = useState('')
  const [ dropDescription, setDropDescription ] = useState('')
  const history = useHistory()
  let { search } = useLocation();
  const query = new URLSearchParams(search)
  const defineStep: defineStep = () => {
    const step = query.get('step')
    if (isValidStep(step)) {
      return step
    }
    return 'choose_type'
  }
  const step = defineStep()
  const cancel = () => clearDropData()
  const back = () => {
    if (step === 'choose_type') {
      return history.push('/')
    }
    history.push(`/campaigns/new?step=${definePreviousStep(step)}`)
  }

  useEffect(() => {
    cancel()
    return () => { cancel() }
  }, [])

  const bredcrumbs = <Breadcrumbs
    path={['My campaigns', 'New campaign']}
    description={defineTitie(step)}
    returnAction={() => back()}
  >
    {step === 'initialize' && chainId === 4 && <div>
      Get Rinkeby test NFTs from <TextLink target='_blank' href='https://faucet.paradigm.xyz/'>this faucet</TextLink>.<br/>Read the <TextLink target='_blank' href='https://www.notion.so/DropList-Alpha-Instruction-3d897edbf6464bf196406958d8024eda'>full instruction</TextLink> how to launch campaign.
    </div>}
  </Breadcrumbs>


  const renderWidget = (step: TRetroDropStep) => {
    switch(step) {
      case 'choose_type':
        return <>
          {bredcrumbs}
          <CampaignType />
        </>
      case 'initialize':
        return <>
          {bredcrumbs}
          <CampaignInitial
            dropLogoURL={dropLogoURL}
            dropDescription={dropDescription}
            cancel={cancel}
          />
        </>

      case 'create_tree':
        return <>
          {bredcrumbs}
          <CampaignTree
            setRecipients={setRecipients}
            cancel={cancel}
          />
        </>
      case 'publish_ipfs':
        return <>
          {bredcrumbs}
          <CampaignInfo
            dropTitle={dropTitle}
            dropLogoURL={dropLogoURL}
            dropDescription={dropDescription}
            setDropTitle={setDropTitle}
            setDropLogoURL={setDropLogoURL}
            setDropDescription={setDropDescription}
            cancel={cancel}
          />
        </>
      case 'deploy_contract':
        return <>
          {bredcrumbs}
          <CampaignDeploy
            dropTitle={dropTitle}
            dropDescription={dropDescription}
            dropLogoURL={dropLogoURL}
            recipients={recipients}
            cancel={cancel}
          />
        </>
      case 'give_approval':
        return <>
          {bredcrumbs}
          <CampaignApproval
            recipients={recipients}
            cancel={cancel}
            dropTitle={dropTitle}
            dropLogoURL={dropLogoURL}
            dropDescription={dropDescription}
          />
        </>
      default:
        return null
    }
  }

  return <div>
    {renderWidget(step)}
  </div>
}

export default connect(mapStateToProps, mapDispatcherToProps)(CampaignsCreate)
