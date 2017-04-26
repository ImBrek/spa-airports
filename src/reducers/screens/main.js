import { combineForms } from 'react-redux-form';

const formsReducer = combineForms({
  airports: {
    amount: 0,
  }
}, 'screens.main');

export default function (oldState = {}, action) {
  const state = formsReducer(oldState, action);

  switch (action.type) {
    default:
      return state;
  }
}
