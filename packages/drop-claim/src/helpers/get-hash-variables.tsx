const getHashVariables =  () => {
  const url = window.location.hash
  const onlyVariablesPart = url.split('?')[1]
  if (!onlyVariablesPart) return {}
  return onlyVariablesPart.split('&').reduce((sum: { [key: string]: string }, item: string) => {
    const variablePair = item.split('=')
    sum[variablePair[0]] = variablePair[1]
    return sum
  }, {})
}

export default getHashVariables