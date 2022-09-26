import { call, put, takeEvery } from "redux-saga/effects"
import axios from "axios"

// Crypto Redux States
import {
  GET_TRANSFERTS,
  ADD_NEW_TRANSFERT,
  DELETE_TRANSFERT,
  UPDATE_TRANSFERT
} from "./actionTypes"

import {
  getTransfertsSuccess,
  getTransfertsFail,
  addTransfertFail,
  updateTransfertFail,
  deleteTransfertSuccess,
  deleteTransfertFail,
  updateTransfertSuccess
} from "./actions"

//Include Both Helper File with needed methods
import {
  getTransferts,
  addNewTransfert,
  updateTransfert,
  deleteTransfert
} from "../../helpers/fakebackend_helper"

function* fetchTransferts({payload: user}) {
    try {
      const response = yield call(getTransferts, user)
      yield put(getTransfertsSuccess(response))
    } catch (error) {
      yield put(getTransfertsFail(error))
    }
}

function* onAddNewTransfert({ payload: transfert }) {
  try {
    const response = yield call(addNewTransfert, transfert)
    // yield fetchTransferts({ payload: transfert.personnel_id })
    yield put(addGroupSuccess(response))
  } catch (error) {
    console.log(error);
    yield put(addTransfertFail(error))
  }
}

function* onUpdateTransfert({ payload: transfert }) {
  try {
    const response = yield call(updateTransfert, transfert, transfert.id)
    // yield fetchTransferts({ payload: transfert.personnel_id })
    yield put(updateTransfertSuccess(response))
  } catch (error) {
    yield put(updateTransfertFail(error))
  }
}

function* onDeleteTransfert({ payload: transfert }) {
  try {
    const response = yield call(deleteTransfert, transfert, transfert.id)
    yield fetchTransferts()
    yield put(deleteTransfertSuccess(response))
  } catch (error) {
    yield put(deleteTransfertFail(error))
  }
}

function* transfertsSaga() {
  yield takeEvery(GET_TRANSFERTS, fetchTransferts)
  yield takeEvery(ADD_NEW_TRANSFERT, onAddNewTransfert)
  yield takeEvery(UPDATE_TRANSFERT, onUpdateTransfert)
  yield takeEvery(DELETE_TRANSFERT, onDeleteTransfert)
}

export default transfertsSaga
