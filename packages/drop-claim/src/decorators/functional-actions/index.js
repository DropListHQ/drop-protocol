import { connect } from 'react-redux'

const functionalActions = (store = (() => ({})), actions = (() => ({})), component) => {
  // store: ({ user }) = > ({ user })
  // actions: (dispatch) => ({ increment: () => dispatch({ type: 'INCREMENT' }) })

  return connect(store, actions)(component)
}


export default functionalActions