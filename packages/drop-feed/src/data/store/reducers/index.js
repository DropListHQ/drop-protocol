import user from './user/reducer'
import communities from './communities/reducer'
import drops from './drops/reducer'
import token from './token/reducer'

const reducers = {
  userReducer: user,
  communitiesReducer: communities,
  dropsReducer: drops,
  tokenReducer: token
}

export default reducers
