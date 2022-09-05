import {
  GET_LOCALS,
  GET_LOCALS_FAIL,
  GET_LOCALS_SUCCESS,
  ADD_NEW_LOCAL,
  ADD_LOCAL_SUCCESS,
  ADD_LOCAL_FAIL,
  UPDATE_LOCAL,
  UPDATE_LOCAL_SUCCESS,
  UPDATE_LOCAL_FAIL,
  DELETE_LOCAL,
  DELETE_LOCAL_SUCCESS,
  DELETE_LOCAL_FAIL,
} from "./actionTypes"

export const getLocals = () => ({
  type: GET_LOCALS,
})

export const getLocalsSuccess = locals => ({
  type: GET_LOCALS_SUCCESS,
  payload: locals,
})

export const getLocalsFail = error => ({
  type: GET_LOCALS_FAIL,
  payload: error,
})

export const addNewLocal = local => ({
  type: ADD_NEW_LOCAL,
  payload: local,
})

export const addLocalSuccess = local => ({
  type: ADD_LOCAL_SUCCESS,
  payload: local,
})

export const addLocalFail = error => ({
  type: ADD_LOCAL_FAIL,
  payload: error,
})

export const updateLocal = local => ({
  type: UPDATE_LOCAL,
  payload: local,
})

export const updateLocalSuccess = local => ({
  type: UPDATE_LOCAL_SUCCESS,
  payload: local,
})

export const updateLocalFail = error => ({
  type: UPDATE_LOCAL_FAIL,
  payload: error,
})

export const deleteLocal = local => ({
  type: DELETE_LOCAL,
  payload: local,
})

export const deleteLocalSuccess = local => ({
  type: DELETE_LOCAL_SUCCESS,
  payload: local,
})

export const deleteLocalFail = error => ({
  type: DELETE_LOCAL_FAIL,
  payload: error,
})
