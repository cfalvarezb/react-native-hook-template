import {call, put, takeLatest} from 'redux-saga/effects';
import {
  GET_CONTACTS_REQUEST,
  getContactsFail,
  getContactsSuccess,
} from './Contacts.Action';
import {getContacts} from '../api';
import {sendNetworkFail} from '../actions';

export function* watchGetContacts() {
  yield takeLatest(GET_CONTACTS_REQUEST, handleGetContacts);
}

function* handleGetContacts(action) {
  const response = yield call(getContacts, action.payload);
  yield put(getContactsSuccess(response));
  // if (response.ok) {
  //   yield put(getContactsSuccess(response.data));
  // } else {
  //   if (
  //     response.problem !== 'NETWORK_ERROR' &&
  //     response.problem !== 'TIMEOUT_ERROR' &&
  //     response.problem !== 'CONNECTION_ERROR'
  //   ) {
  //     yield put(getContactsFail(response.problem));
  //   } else {
  //     yield put(sendNetworkFail(response.problem));
  //     yield put(getContactsFail(response.problem));
  //   }
  // }
}
