import { call, put, takeEvery } from "redux-saga/effects"
import axios from "axios"

// Crypto Redux States
import {
  GET_LOCATIONS,
  ADD_NEW_LOCATION,
  DELETE_LOCATION,
  UPDATE_LOCATION
} from "./actionTypes"

import {
  getLocationsSuccess,
  getLocationsFail,
  addLocationFail,
  updateLocationFail,
  deleteLocationSuccess,
  deleteLocationFail,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getLocations,
  addNewLocation,
  updateLocation,
  deleteLocation
} from "../../helpers/fakebackend_helper"

function* fetchLocations() {
    try {
      const response = yield call(getLocations)
      yield put(getLocationsSuccess(response))
    } catch (error) {
      yield put(getLocationsFail(error))
    }
}

function* onAddNewLocation({ payload: location }) {
  try {
    const response = yield call(addNewLocation, location)
    yield fetchLocations()
    // yield put(addGroupSuccess(response))
  } catch (error) {
    console.log(error);
    yield put(addLocationFail(error))
  }
}

function* onUpdateLocation({ payload: location }) {
  try {
    const response = yield call(updateLocation, location, location.id)
    yield fetchLocations()
    // yield put(updateLocationSuccess(response))
  } catch (error) {
    yield put(updateLocationFail(error))
  }
}

function* onDeleteLocation({ payload: location }) {
  try {
    const response = yield call(deleteLocation, location, location.id)
    yield fetchLocations()
    yield put(deleteLocationSuccess(response))
  } catch (error) {
    yield put(deleteLocationFail(error))
  }
}

function* locationsSaga() {
  yield takeEvery(GET_LOCATIONS, fetchLocations)
  yield takeEvery(ADD_NEW_LOCATION, onAddNewLocation)
  yield takeEvery(UPDATE_LOCATION, onUpdateLocation)
  yield takeEvery(DELETE_LOCATION, onDeleteLocation)
}

export default locationsSaga
