/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { render } from 'react-dom';
import configureStore from 'store/configureStore';
import 'babel-polyfill';
import { AppContainer } from 'react-hot-loader';
// import 'styles/index.scss';
import Root from './containers/Root/index';

const store = configureStore();

render(
  <AppContainer>
    <Root store={store} />
  </AppContainer>,
  // eslint-disable-next-line no-undef
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NewRoot = require('./containers/Root').default; // eslint-disable-line global-require
    render(
      <AppContainer>
        <NewRoot store={store} />
      </AppContainer>,
      // eslint-disable-next-line no-undef
      document.getElementById('root'),
    );
  });
}
