import { fork } from 'redux-saga/effects';

const sagas = [
];

export default function* screens() {
  yield [].concat(...sagas).map(fn => fork(fn));
}
