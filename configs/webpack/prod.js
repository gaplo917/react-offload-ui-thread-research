// production config
const merge = require('webpack-merge')
const { resolve } = require('path')

const commonConfig = require('./common')

module.exports = merge(commonConfig, {
  mode: 'production',
  entry: './index.tsx',
  output: {
    filename: 'js/bundle.[hash].min.js',
    path: resolve(__dirname, '../../dist'),
    publicPath: '/react-offload-ui-thread-research/',
  },
  devtool: 'source-map',
  plugins: [],
})
