import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import _ from 'lodash';
import { initApp } from 'actions/app';
import { Control, Form, Field, actions, Errors, getModel, getField } from 'react-redux-form';
import { requestSuggestion, clearSuggestion } from 'actions/suggestions';
import Autosuggest from 'react-autosuggest';
import { autobind } from 'core-decorators';
import { bindActionCreators } from 'redux';
import SuggestionInput from 'containers/SuggestionInput';

export function transformSuggestions(list) {
  const result = [];
  let group;
  const sorted = _.sortBy(list, ['name', 'airport_name']);
  for (let i = 0; i < sorted.length; i++) {
    const current = sorted[i];
    const next = sorted[i + 1];
    if (next && current.name === next.name && current.name !== group) {
      group = current.name;
      result.push({ name: current.name });
    }
    if (current.airport_name) {
      result.push({
        name: current.name,
        airportName: current.airport_name,
        isGrouped: current.name === group
      });
    }
  }
  return result;
}


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

  getSuggestionValue(suggestion) {
    return suggestion.name;
  }

  renderSuggestion(suggestion) {
    const { airportName, name, isGrouped } = suggestion;
    if (!airportName) {
      return <div>{name}</div>
    }
    if (isGrouped) {
      return <div> > {airportName}</div>
    }
    return (
      <div>
        {name} / {airportName}
      </div>
    )
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

        <SuggestionInput
          model="screens.main.airports.departure"
          renderSuggestion={this.renderSuggestion}
          getSuggestionValue={this.getSuggestionValue}
          transformSuggestions={transformSuggestions}
        />
        <SuggestionInput
          model="screens.main.airports.destination"
          renderSuggestion={this.renderSuggestion}
          getSuggestionValue={this.getSuggestionValue}
          transformSuggestions={transformSuggestions}
        />
      </Form>
    )
  }
}

export default connect(null, { initApp })(MainScreen);
