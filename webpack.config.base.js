/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */

const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = {
  context: `${__dirname}/src`,
  resolve: {
    root: [
      path.resolve('./src'),
    ],
    extensions: ['', '.js', '.jsx'],
  },
  postcss: () => ([autoprefixer({ browsers: ['last 2 versions'] })]),
  sassLoader: {
    includePaths: [path.join(__dirname, './src')],
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel'],
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff&name=[path][name].[hash].[ext]',
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'file-loader?name=[path][name].[hash].[ext]',
      },
      {
        test: /\.(ttf|eot|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
      {
        test: /favicon.ico$/,
        loader: 'file-loader?name=[path][name].[ext]',
      },
      {
        test: /\.(svg)$/,
        loader: 'url-loader',
      },
    ],
  },
};
