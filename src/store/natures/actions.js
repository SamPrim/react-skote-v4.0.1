import {
  GET_NATURES,
  GET_NATURES_FAIL,
  GET_NATURES_SUCCESS,
  ADD_NEW_NATURE,
  ADD_NATURE_SUCCESS,
  ADD_NATURE_FAIL,
  UPDATE_NATURE,
  UPDATE_NATURE_SUCCESS,
  UPDATE_NATURE_FAIL,
  DELETE_NATURE,
  DELETE_NATURE_SUCCESS,
  DELETE_NATURE_FAIL,
} from "./actionTypes"

export const getNatures = () => ({
  type: GET_NATURES,
})

export const getNaturesSuccess = natures => ({
  type: GET_NATURES_SUCCESS,
  payload: natures,
})

export const getNaturesFail = error => ({
  type: GET_NATURES_FAIL,
  payload: error,
})

export const addNewNature = nature => ({
  type: ADD_NEW_NATURE,
  payload: nature,
})

export const addNatureSuccess = nature => ({
  type: ADD_NATURE_SUCCESS,
  payload: nature,
})

export const addNatureFail = error => ({
  type: ADD_NATURE_FAIL,
  payload: error,
})

export const updateNature = nature => ({
  type: UPDATE_NATURE,
  payload: nature,
})

export const updateNatureSuccess = nature => ({
  type: UPDATE_NATURE_SUCCESS,
  payload: nature,
})

export const updateNatureFail = error => ({
  type: UPDATE_NATURE_FAIL,
  payload: error,
})

export const deleteNature = nature => ({
  type: DELETE_NATURE,
  payload: nature,
})

export const deleteNatureSuccess = nature => ({
  type: DELETE_NATURE_SUCCESS,
  payload: nature,
})

export const deleteNatureFail = error => ({
  type: DELETE_NATURE_FAIL,
  payload: error,
})
