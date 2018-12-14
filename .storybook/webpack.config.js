const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
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
    ]}
}