const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

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
    externals: [nodeExternals()],
  plugins: [
    // new webpack.optimize.UglifyJsPlugin()
  ]
}