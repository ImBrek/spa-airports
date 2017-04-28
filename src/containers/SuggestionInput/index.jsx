import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { initApp } from 'actions/app';
import { actions, getModel, getField } from 'react-redux-form';
import { requestSuggestion, clearSuggestion } from 'actions/suggestions';
import Autosuggest from 'react-autosuggest';
import { autobind } from 'core-decorators';
import { bindActionCreators } from 'redux';

const selector = (state, props) => {
  const field = getField(state, props.model);
  return {
    value: getModel(state, props.model) || '',
    suggestions: props.transformSuggestions(field.suggestions || []),
  };
};

@connect(selector,)
export class SuggestionInput extends React.Component {
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

  render() {
    const { suggestions, getSuggestionValue, renderSuggestion } = this.props;
    const inputProps = {
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
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        onSuggestionSelected={this.handleSelect}
        inputProps={inputProps}
      />
    );
  }
}

export default connect(selector, (dispatch, props) => bindActionCreators({
  requestSuggestion: requestSuggestion.bind(null, props.model),
  clearSuggestion: clearSuggestion.bind(null, props.model),
  change: actions.change.bind(null, props.model),
  focus: actions.focus.bind(null, props.model),
  blur: actions.blur.bind(null, props.model),
}, dispatch))(SuggestionInput)

