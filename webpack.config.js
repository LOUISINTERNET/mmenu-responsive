const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: process.env.WEBPACK_MODE,
  context: path.resolve(__dirname, 'src'),
  entry: {
    responsiveMmenu: './index.js'
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    library: 'responsiveMmenu',
    libraryTarget: 'window'
  },
  devtool: 'source-map'
}
