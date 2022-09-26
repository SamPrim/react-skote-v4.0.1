import {
  GET_INVENTORY_SUCCESS,
  GET_INVENTORY_FAIL
} from "./actionTypes"

const INIT_STATE = {
  inventory: [],
  error: false,
}

const Inventory = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_INVENTORY_SUCCESS:
      return {
        ...state,
        inventory: action.payload,
      }

    case GET_INVENTORY_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}

export default Inventory
