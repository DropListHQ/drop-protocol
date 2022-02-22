let propsToSave = []

export const setProps = (props) => propsToSave = props
export const getLocalStore = () => JSON.parse(localStorage.getItem('state')) || {}
export const setLocalStore = (store) => {
  var state = store.getState()
  var toSave = { }
  propsToSave.forEach(p => toSave[p] = state[p])
  localStorage.setItem('state', JSON.stringify(toSave))
}