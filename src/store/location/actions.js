import {
  GET_LOCATIONS,
  GET_LOCATIONS_FAIL,
  GET_LOCATIONS_SUCCESS,
  ADD_NEW_LOCATION,
  ADD_LOCATION_SUCCESS,
  ADD_LOCATION_FAIL,
  UPDATE_LOCATION,
  UPDATE_LOCATION_SUCCESS,
  UPDATE_LOCATION_FAIL,
  DELETE_LOCATION,
  DELETE_LOCATION_SUCCESS,
  DELETE_LOCATION_FAIL,
} from "./actionTypes"

export const getLocations = () => ({
  type: GET_LOCATIONS,
})

export const getLocationsSuccess = locations => ({
  type: GET_LOCATIONS_SUCCESS,
  payload: locations,
})

export const getLocationsFail = error => ({
  type: GET_LOCATIONS_FAIL,
  payload: error,
})

export const addNewLocation = location => ({
  type: ADD_NEW_LOCATION,
  payload: location,
})

export const addLocationSuccess = location => ({
  type: ADD_LOCATION_SUCCESS,
  payload: location,
})

export const addLocationFail = error => ({
  type: ADD_LOCATION_FAIL,
  payload: error,
})

export const updateLocation = location => ({
  type: UPDATE_LOCATION,
  payload: location,
})

export const updateLocationSuccess = location => ({
  type: UPDATE_LOCATION_SUCCESS,
  payload: location,
})

export const updateLocationFail = error => ({
  type: UPDATE_LOCATION_FAIL,
  payload: error,
})

export const deleteLocation = location => ({
  type: DELETE_LOCATION,
  payload: location,
})

export const deleteLocationSuccess = location => ({
  type: DELETE_LOCATION_SUCCESS,
  payload: location,
})

export const deleteLocationFail = error => ({
  type: DELETE_LOCATION_FAIL,
  payload: error,
})
