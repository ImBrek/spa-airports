import { createAction } from 'redux-actions';

export const SUGGESTION = {
  REQUEST: 'SUGGESTION_REQUEST',
  SUCCESS: 'SUGGESTION_SUCCESS',
  CLEAR: 'SUGGESTION_CLEAR',
};

export const clearSuggestion = (model) => ({
  type: SUGGESTION.CLEAR,
  model,
  payload: {},
});

export const requestSuggestion = (model, value) => ({
  type: SUGGESTION.REQUEST,
  model,
  payload: {
    value,
  }
});

export const successSuggestion = (model, suggestions) => ({
  type: SUGGESTION.SUCCESS,
  model,
  payload: {
    suggestions,
  }
});
