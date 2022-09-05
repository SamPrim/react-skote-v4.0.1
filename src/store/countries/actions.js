import {
  GET_COUNTRIES,
  GET_COUNTRIES_FAIL,
  GET_COUNTRIES_SUCCESS,
  ADD_NEW_COUNTRIE,
  ADD_COUNTRIE_SUCCESS,
  ADD_COUNTRIE_FAIL,
  UPDATE_COUNTRIE,
  UPDATE_COUNTRIE_SUCCESS,
  UPDATE_COUNTRIE_FAIL,
  DELETE_COUNTRIE,
  DELETE_COUNTRIE_SUCCESS,
  DELETE_COUNTRIE_FAIL,
} from "./actionTypes"

export const getCountries = () => ({
  type: GET_COUNTRIES,
})

export const getCountriesSuccess = groups => ({
  type: GET_COUNTRIES_SUCCESS,
  payload: groups,
})

export const getCountriesFail = error => ({
  type: GET_COUNTRIES_FAIL,
  payload: error,
})

export const getCountrieProfile = id => ({
  type: GET_COUNTRIES,
  payload: id
})

export const getCountrieProfileSuccess = groupProfile => ({
  type: GET_COUNTRIES_SUCCESS,
  payload: groupProfile,
})

export const getCountrieProfileFail = error => ({
  type: GET_COUNTRIES_FAIL,
  payload: error,
})

export const addNewCountrie = group => ({
  type: ADD_NEW_COUNTRIE,
  payload: group,
})

export const addCountrieSuccess = group => ({
  type: ADD_COUNTRIE_SUCCESS,
  payload: group,
})

export const addCountrieFail = error => ({
  type: ADD_COUNTRIE_FAIL,
  payload: error,
})

export const updateCountrie = group => ({
  type: UPDATE_COUNTRIE,
  payload: group,
})

export const updateCountrieSuccess = group => ({
  type: UPDATE_COUNTRIE_SUCCESS,
  payload: group,
})

export const updateCountrieFail = error => ({
  type: UPDATE_COUNTRIE_FAIL,
  payload: error,
})

export const deleteCountrie = group => ({
  type: DELETE_COUNTRIE,
  payload: group,
})

export const deleteCountrieSuccess = group => ({
  type: DELETE_COUNTRIE_SUCCESS,
  payload: group,
})

export const deleteCountrieFail = error => ({
  type: DELETE_COUNTRIE_FAIL,
  payload: error,
})
