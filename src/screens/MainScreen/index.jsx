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

const selector = (state, props) => {
  const field = getField(state, props.model);
  const s = _.sortBy(field.suggestions || [], 'name');
  return {
    value: getModel(state, props.model) || '',
    suggestions: s,
  };
};

@connect(selector, (dispatch, props) => bindActionCreators({
  requestSuggestion: requestSuggestion.bind(null, props.model),
  clearSuggestion: clearSuggestion.bind(null, props.model),
  change: actions.change.bind(null, props.model),
  focus: actions.focus.bind(null, props.model),
  blur: actions.blur.bind(null, props.model),
}, dispatch))
class MyCustomInput extends React.Component {
  @autobind
  handleChange(event) {
    this.props.change(event.target.value);
  }

  @autobind
  handleSelect(event, { suggestion }) {
    this.props.change(suggestion.name);
    event.preventDefault();
  }

  @autobind
  handleSuggestionsFetchReq({ value }) {
    this.props.requestSuggestion(value);
  }

  @autobind
  handleSuggestionsClearReq() {
    this.props.clearSuggestion();
  }

  getSuggestionValue(suggestion) {
    return suggestion.name;
  }

  renderSuggestion(suggestion) {
    return (
      <div>
        {suggestion.airport_name && suggestion.name} {suggestion.airport_name}
      </div>
    )
  }

  render() {
    const { suggestions } = this.props;
    const inputProps = {
      placeholder: 'Type a programming language',
      value: this.props.value,
      onChange: this.handleChange,
      onBlur: this.props.blur,
      onFocus: this.props.focus,
    };
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchReq}
        onSuggestionsClearRequested={this.handleSuggestionsClearReq}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        onSuggestionSelected={this.handleSelect}
        inputProps={inputProps}
      />
    );
  }
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
        <MyCustomInput model="screens.main.airports.test" />
      </Form>
    )
  }
}

export default connect(null, { initApp })(MainScreen);
