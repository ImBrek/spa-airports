import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import _ from 'lodash';
import { initApp } from 'actions/app';
import { Control, Form, Field, actions, Errors } from 'react-redux-form';
// import Autosuggest from 'react-autosuggest';

// import {
//   screenActivate,
//   screenDeactivate,
// } from 'actions/screens/main';

import CSSModules from 'react-css-modules';

const isRequired = val => !!val;

// @CSSModules(styles)
export class MainScreen extends Component {
  static propTypes = {};

  static defaultProps = {};

  componentWillMount() {
    this.props.initApp();
  }

  handleSubmit(data) {
    console.log(data);
  }

  render() {
    return (
      <Form
        model="screens.main.airports"
        onSubmit={(user) => this.handleSubmit(user)}
      >
        <Field
          model=".amount"
          validators={{ isRequired }}
        >
          <label>Passengers amount</label>
          <input type="text" />
          <Errors
            model=".amount"
            messages={{
              isRequired: 'Please enter passengers amount',
            }}
          />
        </Field>

        <button type="submit">
          Submit!
        </button>
      </Form>
    )
  }
}

export default connect(null, { initApp })(MainScreen);
