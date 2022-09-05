import { call, put, takeEvery } from "redux-saga/effects"
import axios from "axios"

// Crypto Redux States
import {
  GET_NATURES,
  ADD_NEW_NATURE,
  DELETE_NATURE,
  UPDATE_NATURE
} from "./actionTypes"

import {
  getNaturesSuccess,
  getNaturesFail,
  addNatureFail,
  updateNatureSuccess,
  updateNatureFail,
  deleteNatureSuccess,
  deleteNatureFail,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getNatures,
  addNewNature,
  updateNature,
  deleteNature
} from "../../helpers/fakebackend_helper"

function* fetchNatures() {
    try {
      console.log('start groups api');
      const response = yield call(getNatures)
      console.log("test "+response);
      yield put(getNaturesSuccess(response))
    } catch (error) {
      yield put(getNaturesFail(error))
    }
}

function* onAddNewNature({ payload: nature }) {
  try {
    console.log(nature);
    const response = yield call(addNewNature, nature)
    yield fetchNatures()
    // yield put(addNatureSuccess(response))
  } catch (error) {
    console.log(error);
    yield put(addNatureFail(error))
  }
}

function* onUpdateNature({ payload: nature }) {
  try {
    const response = yield call(updateNature, nature, nature.id)
    yield fetchNatures()
    yield put(updateNatureSuccess(response))
  } catch (error) {
    yield put(updateNatureFail(error))
  }
}

function* onDeleteNature({ payload: nature }) {
  try {
    const response = yield call(deleteNature, nature, nature.id)
    yield fetchNatures()
    yield put(deleteNatureSuccess(response))
  } catch (error) {
    yield put(deleteNatureFail(error))
  }
}

function* naturesSaga() {
  yield takeEvery(GET_NATURES, fetchNatures)
  yield takeEvery(ADD_NEW_NATURE, onAddNewNature)
  yield takeEvery(UPDATE_NATURE, onUpdateNature)
  yield takeEvery(DELETE_NATURE, onDeleteNature)
}

export default naturesSaga
