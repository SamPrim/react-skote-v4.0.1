import { call, put, takeEvery } from "redux-saga/effects"
import axios from "axios"

// Crypto Redux States
import {
  GET_CITIES,
  ADD_NEW_CITIE,
  DELETE_CITIE,
  UPDATE_CITIE
} from "./actionTypes"

import {
  getCitiesSuccess,
  getCitiesFail,
  addCitieFail,
  addGroupSuccess,
  updateCitieSuccess,
  updateCitieFail,
  deleteCitieSuccess,
  deleteCitieFail,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getCities,
  addNewCitie,
  updateCitie,
  deleteCitie
} from "../../helpers/fakebackend_helper"

function* fetchCities() {
    try {
      console.log('start groups api');
      const response = yield call(getCities)
      yield put(getCitiesSuccess(response))
    } catch (error) {
      yield put(getCitiesFail(error))
    }
}

function* onAddNewCitie({ payload: citie }) {
  try {
    const response = yield call(addNewCitie, citie)
    yield fetchCities()
    // yield put(addGroupSuccess(response))
  } catch (error) {
    console.log(error);
    yield put(addCitieFail(error))
  }
}

function* onUpdateCitie({ payload: citie }) {
  try {
    const response = yield call(updateCitie, citie, citie.id)
    yield fetchCities()
    yield put(updateCitieSuccess(response))
  } catch (error) {
    yield put(updateCitieFail(error))
  }
}

function* onDeleteCitie({ payload: citie }) {
  try {
    const response = yield call(deleteCitie, citie, citie.id)
    yield fetchCities()
    yield put(deleteCitieSuccess(response))
  } catch (error) {
    yield put(deleteCitieFail(error))
  }
}

function* citiesSaga() {
  yield takeEvery(GET_CITIES, fetchCities)
  yield takeEvery(ADD_NEW_CITIE, onAddNewCitie)
  yield takeEvery(UPDATE_CITIE, onUpdateCitie)
  yield takeEvery(DELETE_CITIE, onDeleteCitie)
}

export default citiesSaga
