import { call, put, takeEvery } from "redux-saga/effects"
import axios from "axios"

// Crypto Redux States
import {
  GET_COUNTRIES,
  GETGROUP_PROFILE,
  GETGROUP_PROFILE_SUCCESS,
  ADD_NEW_COUNTRIE,
  DELETE_COUNTRIE,
  UPDATE_COUNTRIE
} from "./actionTypes"

import {
  getCountriesSuccess,
  getCountriesFail,
  addCountrieFail,
  addGroupSuccess,
  updateCountrieSuccess,
  updateCountrieFail,
  deleteCountrieSuccess,
  deleteCountrieFail,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getCountries,
  addNewCountrie,
  updateCountrie,
  deleteCountrie
} from "../../helpers/fakebackend_helper"

function* fetchCountries() {
    try {
      console.log('start groups api');
      const response = yield call(getCountries)
      console.log("test "+response);
      yield put(getCountriesSuccess(response))
    } catch (error) {
      yield put(getCountriesFail(error))
    }
}

function* onAddNewCountrie({ payload: countrie }) {
  try {
    console.log(countrie);
    const response = yield call(addNewCountrie, countrie)
    yield fetchCountries()
    // yield put(addGroupSuccess(response))
  } catch (error) {
    console.log(error);
    yield put(addCountrieFail(error))
  }
}

function* onUpdateCountrie({ payload: countrie }) {
  try {
    const response = yield call(updateCountrie, countrie, countrie.id)
    yield fetchCountries()
    yield put(updateCountrieSuccess(response))
  } catch (error) {
    yield put(updateCountrieFail(error))
  }
}

function* onDeleteCountrie({ payload: countrie }) {
  try {
    const response = yield call(deleteCountrie, countrie, countrie.id)
    yield fetchCountries()
    yield put(deleteCountrieSuccess(response))
  } catch (error) {
    yield put(deleteCountrieFail(error))
  }
}

function* countriesSaga() {
  yield takeEvery(GET_COUNTRIES, fetchCountries)
  yield takeEvery(ADD_NEW_COUNTRIE, onAddNewCountrie)
  yield takeEvery(UPDATE_COUNTRIE, onUpdateCountrie)
  yield takeEvery(DELETE_COUNTRIE, onDeleteCountrie)
}

export default countriesSaga
