import { call, put, takeEvery } from "redux-saga/effects"
import axios from "axios"

// Crypto Redux States
import {
  GET_DELEVERYS,
  ADD_NEW_DELEVERY,
  DELETE_DELEVERY,
  UPDATE_DELEVERY
} from "./actionTypes"

import {
  getDeleverySuccess,
  getDeleveryFail,
  addDeleveryFail,
  updateDeleveryFail,
  deleteDeleverySuccess,
  deleteDeleveryFail,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getDeleverys,
  addNewDelevery,
  updateDelevery,
  deleteDelevery
} from "../../helpers/fakebackend_helper"

function* fetchDeleverys() {
    try {
      const response = yield call(getDeleverys)
      yield put(getDeleverySuccess(response))
    } catch (error) {
      yield put(getDeleveryFail(error))
    }
}

function* onAddNewDelevery({ payload: delevery }) {
  try {
    // const response = yield call(addNewDelevery, delevery)
    yield axios({
      method: "post",
      url:"http://localhost:8000/stock/livraison",
      data: delevery,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    yield fetchDeleverys()
    // yield put(addGroupSuccess(response))
  } catch (error) {
    console.log(error);
    yield put(addDeleveryFail(error))
  }
}

function* onUpdateDelevery({ payload: delevery }) {
  try {
    // const response = yield call(updateDelevery, delevery, delevery.get("id"))
    yield axios({
      method: "put",
      url:"http://localhost:8000/stock/"+delevery.get("id")+"/livraison",
      data: delevery,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    yield fetchDeleverys()
    
    // yield put(updateDeleverySuccess(response))
  } catch (error) {
    yield put(updateDeleveryFail(error))
  }
}

function* onDeleteDelevery({ payload: delevery }) {
  try {
    const response = yield call(deleteDelevery, delevery, delevery.id)
    yield fetchDeleverys()
    yield put(deleteDeleverySuccess(response))
  } catch (error) {
    yield put(deleteDeleveryFail(error))
  }
}

function* deleverysSaga() {
  yield takeEvery(GET_DELEVERYS, fetchDeleverys)
  yield takeEvery(ADD_NEW_DELEVERY, onAddNewDelevery)
  yield takeEvery(UPDATE_DELEVERY, onUpdateDelevery)
  yield takeEvery(DELETE_DELEVERY, onDeleteDelevery)
}

export default deleverysSaga
