import { call, put, takeEvery } from "redux-saga/effects"
import axios from "axios"

// Crypto Redux States
import {
  GET_LOCALS,
  ADD_NEW_LOCAL,
  DELETE_LOCAL,
  UPDATE_LOCAL
} from "./actionTypes"

import {
  getLocalsSuccess,
  getLocalsFail,
  addLocalFail,
  updateLocalFail,
  deleteLocalSuccess,
  deleteLocalFail,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getLocals,
  addNewLocal,
  updateLocal,
  deleteLocal
} from "../../helpers/fakebackend_helper"

function* fetchLocals() {
    try {
      const response = yield call(getLocals)
      yield put(getLocalsSuccess(response))
    } catch (error) {
      yield put(getLocalsFail(error))
    }
}

function* onAddNewLocal({ payload: local }) {
  try {
    const response = yield call(addNewLocal, local)
    yield fetchLocals()
    // yield put(addGroupSuccess(response))
  } catch (error) {
    console.log(error);
    yield put(addLocalFail(error))
  }
}

function* onUpdateLocal({ payload: local }) {
  try {
    const response = yield call(updateLocal, local, local.id)
    yield fetchLocals()
    // yield put(updateLocalSuccess(response))
  } catch (error) {
    yield put(updateLocalFail(error))
  }
}

function* onDeleteLocal({ payload: local }) {
  try {
    const response = yield call(deleteLocal, local, local.id)
    yield fetchLocals()
    yield put(deleteLocalSuccess(response))
  } catch (error) {
    yield put(deleteLocalFail(error))
  }
}

function* localsSaga() {
  yield takeEvery(GET_LOCALS, fetchLocals)
  yield takeEvery(ADD_NEW_LOCAL, onAddNewLocal)
  yield takeEvery(UPDATE_LOCAL, onUpdateLocal)
  yield takeEvery(DELETE_LOCAL, onDeleteLocal)
}

export default localsSaga
