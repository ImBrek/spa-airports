import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import _ from 'lodash';
import { Form, Field, Errors } from 'react-redux-form';
import SuggestionInput from 'containers/SuggestionInput';
import { submitForm } from 'actions/screens/main';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';

export function transformSuggestions(list) {
  const result = [];
  let group;
  const sorted = _.sortBy(list, ['name', 'airport_name']);
  for (let i = 0; i < sorted.length; i += 1) {
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
        isGrouped: current.name === group,
      });
    }
  }
  return result;
}


const selector = createSelector(
  state => state.screens.main,
  screen => ({
    data: screen.data || {},
  }),
);


const isRequired = val => !!val;
const isLess = max => val => val < max;
const isLess10 = isLess(10);

@CSSModules(styles)
export class MainScreen extends Component {
  static propTypes = {
    submitForm: PropTypes.func.isRequired,
    data: PropTypes.shape({
      // TODO
    }).isRequired,

  };

  static defaultProps = {};

  componentWillMount() {
  }


  getSuggestionValue(suggestion) {
    return `${suggestion.airportName}`;
  }

  renderSuggestion(suggestion) {
    const { airportName, name, isGrouped } = suggestion;
    if (!airportName) {
      return (<div>{name}</div>);
    }
    if (isGrouped) {
      return (<div> -- {airportName}</div>);
    }
    return (
      <div>
        {name} / {airportName}
      </div>
    );
  }

  render() {
    const { data } = this.props;
    return (
      <div>
        <Form
          model="screens.main.airports"
          onSubmit={this.props.submitForm}
        >
          <label>Passengers amount</label>
          <Field
            model=".amount"
            validators={{
              isRequired,
              isLess10,
            }}
          >
            <input type="text" />
            <Errors
              model=".amount"
              messages={{
                isRequired: 'Please enter passengers amount',
                isLess10: 'Max value in this field is 9',
              }}
            />
          </Field>

          <label styleName="row">Departure</label>
          <SuggestionInput
            model="screens.main.airports.departure"
            renderSuggestion={this.renderSuggestion}
            getSuggestionValue={this.getSuggestionValue}
            transformSuggestions={transformSuggestions}
          />
          <label styleName="row">Destination</label>
          <SuggestionInput
            model="screens.main.airports.destination"
            renderSuggestion={this.renderSuggestion}
            getSuggestionValue={this.getSuggestionValue}
            transformSuggestions={transformSuggestions}
          />

          <button styleName="submit" type="submit">
            Submit!
          </button>
        </Form>
        <div>Result: {JSON.stringify(data)}</div>
      </div>
    );
  }
}

export default connect(selector, { submitForm })(MainScreen);
