import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import _ from 'lodash';
// import {
//   screenActivate,
//   screenDeactivate,
// } from 'actions/screens/main';

import CSSModules from 'react-css-modules';


// @CSSModules(styles)
export class MainScreen extends Component {
  static propTypes = {};

  static defaultProps = {};


  render() {
    return (<div>Hello world</div>)
  }
}

export default connect(null, {})(MainScreen);
