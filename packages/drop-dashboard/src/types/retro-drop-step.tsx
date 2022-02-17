type TRetroDropStep = 'initialize' | 'create_tree' | 'publish_ipfs' | 'deploy_contract' | 'give_approval' | 'choose_type'
export function isValidStep(step: string | null): step is TRetroDropStep {
  if (!step) { return false }
  return ['initialize', 'create_tree',  'publish_ipfs', 'deploy_contract', 'give_approval', 'choose_type'].indexOf(step) !== -1;
}
export default TRetroDropStep