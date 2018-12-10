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
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
}
