import {
  GET_TRANSFERTS_SUCCESS,
  GET_TRANSFERTS_FAIL,
  ADD_TRANSFERT_SUCCESS,
  ADD_TRANSFERT_FAIL,
  UPDATE_TRANSFERT_SUCCESS,
  UPDATE_TRANSFERT_FAIL,
  DELETE_TRANSFERT_SUCCESS,
  DELETE_TRANSFERT_FAIL
} from "./actionTypes"

const INIT_STATE = {
  transferts: [],
  error: false,
}

const Transferts = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_TRANSFERTS_SUCCESS:
      return {
        ...state,
        transferts: action.payload,
      }

    case GET_TRANSFERTS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_TRANSFERT_SUCCESS:
      return {
        ...state,
        transferts: [...state.transferts, action.payload],
      }

    case ADD_TRANSFERT_FAIL:
      return {
        ...state,
        error: action.payload,
      }
      
      case UPDATE_TRANSFERT_SUCCESS:
        return {
          ...state,
          transferts: state.transferts.map(transfert =>
            transfert.id.toString() === action.payload.id.toString()
              ? { transfert, ...action.payload }
              : transfert
          ),
        }

      case UPDATE_TRANSFERT_FAIL:
        return {
          ...state,
          error: action.payload,
        }
  
      case DELETE_TRANSFERT_SUCCESS:
        return {
          ...state,
          transferts: state.transferts.filter(
            transfert => transfert.id.toString() !== action.payload.id.toString()
          ),
        }
  
      case DELETE_TRANSFERT_FAIL:
        return {
          ...state,
          error: action.payload,
        }

    default:
      return state
  }
}

export default Transferts
