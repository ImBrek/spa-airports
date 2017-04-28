import { take, put } from 'redux-saga/effects';
import { SUGGESTION, successSuggestion } from 'actions/suggestions';
import { getPlaces, PLACES } from 'actions/places';

export default function* mainScreen() {
  while (true) {
    const action = yield take(SUGGESTION.REQUEST);
    yield put(getPlaces(action.payload.value));
    const responseAction = yield take([PLACES.READ.SUCCESS, PLACES.READ.FAILURE]);
    if (!responseAction.error) {
      yield put(successSuggestion(action.model, responseAction.payload.response))
    }
  }
}
