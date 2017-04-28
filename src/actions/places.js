import { createAction } from 'redux-actions';
import { API_CALL, API_READ } from 'utils/api';

export const PLACES = {
  READ: {
    REQUEST: 'PLACES_REQUEST',
    SUCCESS: 'PLACES_SUCCESS',
    FAILURE: 'PLACES_FAILURE',
  },
};


export const getPlaces = createAction(PLACES.READ.REQUEST, value => ({
  [API_CALL]: {
    method: API_READ,
    actions: PLACES.READ,
    endpoint: 'match',
    queryParams: {
      max: 15,
      term: value,
    },
  },
}));
