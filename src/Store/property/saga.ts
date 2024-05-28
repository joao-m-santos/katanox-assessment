import { put, takeLatest } from 'redux-saga/effects';

import { getPropertiesSuccess, GET_PROPERTIES_ACTION } from './slice';
import { getPropertiesService } from './service';
import type { IPropertyObject } from './types';

function* getPropertiesSaga() {
  try {
    const response: Array<IPropertyObject> = yield getPropertiesService();
    yield put(getPropertiesSuccess(response));
  } catch (error) {
    // TODO: Handle errors
  }
}

export function* watchGetProperties() {
  yield takeLatest(GET_PROPERTIES_ACTION, getPropertiesSaga);
}
