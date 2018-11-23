import { all, put, takeEvery, take, select } from 'redux-saga/effects';
import { selectShouldConfirmIncrement } from '../selectors';
import { closeModal, openModal, increment } from '../actions';

export function* incrementWithConfirm() {
  if (selectShouldConfirmIncrement(yield select())) {
    yield put(openModal('CONFIRM_INCREMENT_MODAL'));
    // payload is `any` here
    // https://github.com/Microsoft/TypeScript/issues/2983
    // https://github.com/redux-saga/redux-saga/issues/1504
    const { payload } = yield take('CONFIRM_INCREMENT');
    const accepted = payload ? [put(increment())] : [];
    yield all([...accepted, put(closeModal())]);
  } else {
    yield put(increment());
  }
}

export function* watchIncrementWithConfirm() {
  yield takeEvery('MAYBE_INCREMENT', incrementWithConfirm);
}

export function* rootSaga() {
  yield all([watchIncrementWithConfirm()]);
}
