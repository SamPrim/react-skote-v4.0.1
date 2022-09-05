import {
  GET_CITIES,
  GET_CITIES_FAIL,
  GET_CITIES_SUCCESS,
  ADD_NEW_CITIE,
  ADD_CITIE_SUCCESS,
  ADD_CITIE_FAIL,
  UPDATE_CITIE,
  UPDATE_CITIE_SUCCESS,
  UPDATE_CITIE_FAIL,
  DELETE_CITIE,
  DELETE_CITIE_SUCCESS,
  DELETE_CITIE_FAIL,
} from "./actionTypes"

export const getCities = () => ({
  type: GET_CITIES,
})

export const getCitiesSuccess = cities => ({
  type: GET_CITIES_SUCCESS,
  payload: cities,
})

export const getCitiesFail = error => ({
  type: GET_CITIES_FAIL,
  payload: error,
})

export const addNewCitie = citie => ({
  type: ADD_NEW_CITIE,
  payload: citie,
})

export const addCitieSuccess = citie => ({
  type: ADD_CITIE_SUCCESS,
  payload: citie,
})

export const addCitieFail = error => ({
  type: ADD_CITIE_FAIL,
  payload: error,
})

export const updateCitie = citie => ({
  type: UPDATE_CITIE,
  payload: citie,
})

export const updateCitieSuccess = citie => ({
  type: UPDATE_CITIE_SUCCESS,
  payload: citie,
})

export const updateCitieFail = error => ({
  type: UPDATE_CITIE_FAIL,
  payload: error,
})

export const deleteCitie = citie => ({
  type: DELETE_CITIE,
  payload: citie,
})

export const deleteCitieSuccess = citie => ({
  type: DELETE_CITIE_SUCCESS,
  payload: citie,
})

export const deleteCitieFail = error => ({
  type: DELETE_CITIE_FAIL,
  payload: error,
})
