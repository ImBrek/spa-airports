/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.dev');
const argv = require('minimist')(process.argv.slice(2));
const appConfig = require('./src/configs/common');

const port = argv.port || appConfig.app.url.port || 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
  },
  noInfo: true,
}));

app.get('/static/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', req.params[0]));
});

app.use(require('webpack-hot-middleware')(compiler));

app.use((req, res) => {
  res.sendFile(`${__dirname}/src/index.html`);
});

app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('==> Webpack development server listening on port %s', port);
  }
});
