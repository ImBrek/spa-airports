import i from 'icepick';
import { SUGGESTION } from 'actions/suggestions';

export default function (state, action, localPath) {
  switch (action.type) {
    case SUGGESTION.SUCCESS:
      return i.assocIn(state, [...localPath, 'suggestions'], action.payload.suggestions);
    case SUGGESTION.CLEAR:
      return i.assocIn(state, [...localPath, 'suggestions'], []);
    default:
      return state;
  }
};
