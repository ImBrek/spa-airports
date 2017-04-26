import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import MainScreen from 'screens/MainScreen';

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  render() {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <div className="app">
          <MainScreen />
        </div>
      </Provider>
    );
  }
}
