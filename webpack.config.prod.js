/* eslint-disable  */

var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var fileSystem = require("fs");
var url = require("url");
const config = require('./src/configs/common');
var _ = require("lodash");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.config.base');

const NODE_ENV = process.env.NODE_ENV || 'development';

const prodConfig =  {
  context: __dirname + '/src',
  devtool: null,
  entry: [
    './index',
    'babel-polyfill'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.[hash].js',
    publicPath: `${url.format(_.assign(config.app.url, { pathname: 'static' }))}/`,
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        unsafe: true
      }
    }),
    new HtmlWebpackPlugin({
      template: 'indexProd.html'
    }),
    new ExtractTextPlugin('[name]-[chunkhash].css', { allChunks: true }),
  ],
  postcss: function () {
    return [autoprefixer({ browsers: ['last 2 versions'] })];
  },
  sassLoader: {
    includePaths: [path.join(__dirname, './src')]
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css'),
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss!sass?outputStyle=expanded&sourceMap'),
      },
    ],
  },
};

module.exports = _.mergeWith(baseConfig, prodConfig, (objValue, srcValue) => {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
});

