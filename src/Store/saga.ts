import { all, fork } from 'redux-saga/effects';

import { watchGetProperties } from './property/saga';

export default function* rootSaga() {
  yield all([fork(watchGetProperties)]);
}
