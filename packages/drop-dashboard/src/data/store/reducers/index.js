import user from './user/reducer'
import contract from './contract/reducer'
import newRetroDrop from './new-retro-drop/reducer'
import communities from './communities/reducer'
import drops from './drops/reducer'

const reducers = {
  userReducer: user,
  contractReducer: contract,
  newRetroDropReducer: newRetroDrop,
  communitiesReducer: communities,
  dropsReducer: drops
}

export default reducers
