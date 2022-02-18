const path = require(`path`)
const webpack = require('webpack')

module.exports = {
  webpack: {
    alias: {
      react: path.resolve('./../../node_modules/react')
    }
  },
}
