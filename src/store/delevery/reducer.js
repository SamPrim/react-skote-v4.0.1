import {
  GET_DELEVERYS_SUCCESS,
  GET_DELEVERYS_FAIL,
  ADD_DELEVERY_SUCCESS,
  ADD_DELEVERY_FAIL,
  UPDATE_DELEVERY_SUCCESS,
  UPDATE_DELEVERY_FAIL,
  DELETE_DELEVERY_SUCCESS,
  DELETE_DELEVERY_FAIL
} from "./actionTypes"

const INIT_STATE = {
  deleverys: [],
  error: false,
}

const Deleverys = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_DELEVERYS_SUCCESS:
      return {
        ...state,
        deleverys: action.payload,
      }

    case GET_DELEVERYS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_DELEVERY_SUCCESS:
      return {
        ...state,
        deleverys: [...state.deleverys, action.payload],
      }

    case ADD_DELEVERY_FAIL:
      return {
        ...state,
        error: action.payload,
      }
      
      case UPDATE_DELEVERY_SUCCESS:
        return {
          ...state,
          deleverys: state.deleverys.map(delevery =>
            delevery.id.toString() === action.payload.id.toString()
              ? { delevery, ...action.payload }
              : delevery
          ),
        }

      case UPDATE_DELEVERY_FAIL:
        return {
          ...state,
          error: action.payload,
        }
  
      case DELETE_DELEVERY_SUCCESS:
        return {
          ...state,
          deleverys: state.deleverys.filter(
            delevery => delevery.id.toString() !== action.payload.id.toString()
          ),
        }
  
      case DELETE_DELEVERY_FAIL:
        return {
          ...state,
          error: action.payload,
        }

    default:
      return state
  }
}

export default Deleverys
