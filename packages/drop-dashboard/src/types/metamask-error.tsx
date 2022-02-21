interface MetamaskError extends Error {
  code?: number | string;
}

export default MetamaskError