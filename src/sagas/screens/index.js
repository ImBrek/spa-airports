import { fork } from 'redux-saga/effects';
import main from './main';

const sagas = [
  main,
];

export default function* screens() {
  yield [].concat(...sagas).map(fn => fork(fn));
}
