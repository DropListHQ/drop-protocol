const secondsToDhms = (seconds: number) => {
  seconds = Number(seconds);
  const d = Math.floor(seconds / (3600*24))
  const h = Math.floor(seconds % (3600*24) / 3600)
  const m = Math.floor(seconds % 3600 / 60)

  
  const days = d + 'd'
  const hours = h + 'h'
  const minutes = m + 'm'
  return {
    days,
    hours,
    minutes
  }
}

export default secondsToDhms