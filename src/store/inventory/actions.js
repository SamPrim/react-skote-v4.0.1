import {
  GET_INVENTORY,
  GET_INVENTORY_FAIL,
  GET_INVENTORY_SUCCESS
} from "./actionTypes"

export const getInventory = () => ({
  type: GET_INVENTORY,
})

export const getInventorySuccess = inventory => ({
  type: GET_INVENTORY_SUCCESS,
  payload: inventory,
})

export const getInventoryFail = error => ({
  type: GET_INVENTORY_FAIL,
  payload: error,
})

