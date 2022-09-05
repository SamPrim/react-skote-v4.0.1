import {
  GET_DELEVERYS,
  GET_DELEVERYS_FAIL,
  GET_DELEVERYS_SUCCESS,
  ADD_NEW_DELEVERY,
  ADD_DELEVERY_SUCCESS,
  ADD_DELEVERY_FAIL,
  UPDATE_DELEVERY,
  UPDATE_DELEVERY_SUCCESS,
  UPDATE_DELEVERY_FAIL,
  DELETE_DELEVERY,
  DELETE_DELEVERY_SUCCESS,
  DELETE_DELEVERY_FAIL,
} from "./actionTypes"

export const getDeleverys = () => ({
  type: GET_DELEVERYS,
})

export const getDeleverySuccess = deleverys => ({
  type: GET_DELEVERYS_SUCCESS,
  payload: deleverys,
})

export const getDeleveryFail = error => ({
  type: GET_DELEVERYS_FAIL,
  payload: error,
})

export const addNewDelevery = delevery => ({
  type: ADD_NEW_DELEVERY,
  payload: delevery,
})

export const addDeleverySuccess = delevery => ({
  type: ADD_DELEVERY_SUCCESS,
  payload: delevery,
})

export const addDeleveryFail = error => ({
  type: ADD_DELEVERY_FAIL,
  payload: error,
})

export const updateDelevery = delevery => ({
  type: UPDATE_DELEVERY,
  payload: delevery,
})

export const updateDeleverySuccess = delevery => ({
  type: UPDATE_DELEVERY_SUCCESS,
  payload: delevery,
})

export const updateDeleveryFail = error => ({
  type: UPDATE_DELEVERY_FAIL,
  payload: error,
})

export const deleteDelevery = delevery => ({
  type: DELETE_DELEVERY,
  payload: delevery,
})

export const deleteDeleverySuccess = delevery => ({
  type: DELETE_DELEVERY_SUCCESS,
  payload: delevery,
})

export const deleteDeleveryFail = error => ({
  type: DELETE_DELEVERY_FAIL,
  payload: error,
})
