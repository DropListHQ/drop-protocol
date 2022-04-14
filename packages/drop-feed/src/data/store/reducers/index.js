import user from './user/reducer'
import communities from './communities/reducer'
import campaigns from './campaigns/reducer'
import token from './token/reducer'

const reducers = {
  userReducer: user,
  communitiesReducer: communities,
  campaignsReducer: campaigns,
  tokenReducer: token
}

export default reducers
