const shortenString = (string: string | undefined) => {
  if (!string) return '...'
  return `${string.slice(0, 2)}...${string.slice(-5)}`
}

export default shortenString