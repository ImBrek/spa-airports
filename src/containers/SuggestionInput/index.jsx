import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions, getModel, getField } from 'react-redux-form';
import { requestSuggestion, clearSuggestion } from 'actions/suggestions';
import Autosuggest from 'react-autosuggest';
import { autobind } from 'core-decorators';
import { bindActionCreators } from 'redux';
import styles from './styles.scss';

const selector = (state, props) => {
  const field = getField(state, props.model);
  return {
    value: getModel(state, props.model) || '',
    suggestions: props.transformSuggestions(field.suggestions || []),
  };
};

export class SuggestionInput extends Component {
  static propTypes = {
    change: PropTypes.func.isRequired,
    blur: PropTypes.func.isRequired,
    focus: PropTypes.func.isRequired,
    renderSuggestion: PropTypes.func.isRequired,
    getSuggestionValue: PropTypes.func.isRequired,
    clearSuggestion: PropTypes.func.isRequired,
    requestSuggestion: PropTypes.func.isRequired,
    suggestions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    value: PropTypes.string,
  };

  static defaultProps = {
    value: '',
  };

  @autobind
  handleChange(event) {
    this.props.change(event.target.value);
  }

  @autobind
  handleSelect(event, { suggestion }) {
    // TODO: move this to props
    this.props.change(`${suggestion.name} ${suggestion.airportName}`);
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
        theme={styles}
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
}, dispatch))(SuggestionInput);

