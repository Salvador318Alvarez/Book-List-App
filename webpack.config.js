const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '/'),
    filename: 'bundle.js'
  },
  devtool: 'eval-source-map',
  watch: true,
}