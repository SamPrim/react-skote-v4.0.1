import {
  GET_TRANSFERTS,
  GET_TRANSFERTS_FAIL,
  GET_TRANSFERTS_SUCCESS,
  ADD_NEW_TRANSFERT,
  ADD_TRANSFERT_SUCCESS,
  ADD_TRANSFERT_FAIL,
  UPDATE_TRANSFERT,
  UPDATE_TRANSFERT_SUCCESS,
  UPDATE_TRANSFERT_FAIL,
  DELETE_TRANSFERT,
  DELETE_TRANSFERT_SUCCESS,
  DELETE_TRANSFERT_FAIL,
} from "./actionTypes"

export const getTransferts = user => ({
  type: GET_TRANSFERTS,
  payload: user
})

export const getTransfertsSuccess = transferts => ({
  type: GET_TRANSFERTS_SUCCESS,
  payload: transferts,
})

export const getTransfertsFail = error => ({
  type: GET_TRANSFERTS_FAIL,
  payload: error,
})

export const addNewTransfert = transfert => ({
  type: ADD_NEW_TRANSFERT,
  payload: transfert,
})

export const addTransfertSuccess = transfert => ({
  type: ADD_TRANSFERT_SUCCESS,
  payload: transfert,
})

export const addTransfertFail = error => ({
  type: ADD_TRANSFERT_FAIL,
  payload: error,
})

export const updateTransfert = transfert => ({
  type: UPDATE_TRANSFERT,
  payload: transfert,
})

export const updateTransfertSuccess = transfert => ({
  type: UPDATE_TRANSFERT_SUCCESS,
  payload: transfert,
})

export const updateTransfertFail = error => ({
  type: UPDATE_TRANSFERT_FAIL,
  payload: error,
})

export const deleteTransfert = transfert => ({
  type: DELETE_TRANSFERT,
  payload: transfert,
})

export const deleteTransfertSuccess = transfert => ({
  type: DELETE_TRANSFERT_SUCCESS,
  payload: transfert,
})

export const deleteTransfertFail = error => ({
  type: DELETE_TRANSFERT_FAIL,
  payload: error,
})
