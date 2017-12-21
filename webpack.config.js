const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/scrollableTimePicker/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'scrollable-time-picker.min.js',
    libraryTarget: 'umd',
    library: 'scrollable-time-picker'
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
                ['react'],                    
                ['es2015', { modules: false }]
              ]
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
}