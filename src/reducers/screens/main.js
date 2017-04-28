import { combineForms } from 'react-redux-form';
import suggestionReducer from 'utils/suggestionReducer';
import { SCREEN } from 'actions/screens/main';

const formsReducer = combineForms({
  airports: {
    amount: 0,
    departure: '',
    destination: '',
  },
}, 'screens.main', {
  plugins: [suggestionReducer],
});

export default function (oldState = {}, action) {
  const state = {
    ...formsReducer(oldState, action),
  };

  switch (action.type) {
    case SCREEN.SUBMIT_FORM:
      return {
        ...state,
        data: action.payload.data,
      };
    default:
      return state;
  }
}
