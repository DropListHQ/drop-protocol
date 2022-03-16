const secondsToDhms = (seconds: number) => {
  seconds = Number(seconds);
  const d = Math.floor(seconds / (3600*24))
  const h = Math.floor(seconds % (3600*24) / 3600)
  const m = Math.floor(seconds % 3600 / 60)

  
  const days = (d <= 0 ? 0 : d) + 'd'
  const hours = (h <= 0 ? 0 : h) + 'h'
  const minutes = (m <= 0 ? 0 : m) + 'm'
  return {
    days,
    hours,
    minutes
  }
}

export default secondsToDhms