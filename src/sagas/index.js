import { fork } from 'redux-saga/effects';
import watchApiRequests from './api';
import screens from './screens';


const sagas = [
  watchApiRequests,
  screens,
];

export default function* root() {
  yield [].concat(...sagas).map(fn => fork(fn));
}
