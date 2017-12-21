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
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'env', 'es2015'],
          plugins: ['transform-class-properties', 'transform-object-rest-spread']
        }
    }
    ]},
  plugins: [
    // new webpack.optimize.UglifyJsPlugin()
  ]
}