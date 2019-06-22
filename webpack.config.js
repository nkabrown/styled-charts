const path = require('path');

const config = {
  entry: path.resolve(__dirname, './src/js/entry'),
  output: {
    path: path.resolve(__dirname, './src/dist'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      } 
    ]
  }
}

module.exports = config;
