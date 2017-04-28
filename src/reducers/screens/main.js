import { combineForms } from 'react-redux-form';
import i from 'icepick';
import { SUGGESTION } from 'actions/suggestions';

const suggestionReducer = (state, action, localPath) => {
  switch (action.type) {
    case SUGGESTION.SUCCESS:
      return i.assocIn(state, [...localPath, 'suggestions'], action.payload.suggestions);
    case SUGGESTION.CLEAR:
      return i.assocIn(state, [...localPath, 'suggestions'], []);
    default:
      return state;
  }
};

const formsReducer = combineForms({
  airports: {
    amount: 0,
    test: '',
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
