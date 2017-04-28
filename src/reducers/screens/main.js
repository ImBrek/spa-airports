import { combineForms } from 'react-redux-form';
import suggestionReducer from 'utils/suggestionReducer';

const formsReducer = combineForms({
  airports: {
    amount: 0,
    departure: '',
    destination: '',
  }
}, 'screens.main', {
  plugins: [suggestionReducer]
});

export default function (oldState = {}, action) {
  const state = formsReducer(oldState, action);

  switch (action.type) {
    default:
      return state;
  }
}
