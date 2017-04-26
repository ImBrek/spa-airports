/**
 * Sagas for create API requests
 * saga wait until action with ket [API_CALL] will be dispatch
 * create request to server via services/api
 * if services/api resolve promise then saga dispatch SUCCESS action
 * else dispatch FAILURE ACTION
 */

import fetch, { API_CALL, API_STATUS } from 'utils/api';
import { call, put, take, fork } from 'redux-saga/effects';
import { successResponse, failResponse } from 'actions/api';
/**
 * Create API request via services/api
 * @param payload
 * @return {*}
 */
export function* sendRequest(payload) {
  const request = yield call(fetch, payload);

  // if (
  //   request.response.status === API_STATUS.FORBIDDEN
  //   || request.response.status === API_STATUS.UNAUTHORIZED
  // ) {
  //   yield put(tokenRequired());
  // }

  return request;
}

/**
 * Generate actions according promise result
 * @param payload
 */
export function* processRequest(payload) {
  const actions = payload.actions;
  delete payload.actions;

  const { response, error } = yield sendRequest(payload);
  if (!error) {
    yield put(successResponse(actions.SUCCESS, payload, response, payload.id));
  } else {
    yield put(failResponse(actions.FAILURE, payload, response, payload.id, error));
  }
}

/**
 * Watch actions for API requests
 */
export default function* watchApiRequests() {
  while (true) {
    const { payload } = yield take(action =>
      action.payload && action.payload[API_CALL],
    );
    yield fork(processRequest, payload[API_CALL]);
  }
}

