import {
  GET_NATURES_SUCCESS,
  GET_NATURES_FAIL,
  ADD_NATURE_SUCCESS,
  ADD_NATURE_FAIL,
  UPDATE_NATURE_SUCCESS,
  UPDATE_NATURE_FAIL,
  DELETE_NATURE_SUCCESS,
  DELETE_NATURE_FAIL
} from "./actionTypes"

const INIT_STATE = {
  natures: [],
  error: false,
}

const Natures = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_NATURES_SUCCESS:
      return {
        ...state,
        natures: action.payload,
      }

    case GET_NATURES_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_NATURE_SUCCESS:
      return {
        ...state,
        natures: [...state.natures, action.payload],
      }

    case ADD_NATURE_FAIL:
      return {
        ...state,
        error: action.payload,
      }
      
      case UPDATE_NATURE_SUCCESS:
        return {
          ...state,
          natures: state.natures.map(nature =>
            nature.id.toString() === action.payload.id.toString()
              ? { nature, ...action.payload }
              : nature
          ),
        }

      case UPDATE_NATURE_FAIL:
        return {
          ...state,
          error: action.payload,
        }
  
      case DELETE_NATURE_SUCCESS:
        return {
          ...state,
          natures: state.natures.filter(
            nature => nature.id.toString() !== action.payload.id.toString()
          ),
        }
  
      case DELETE_NATURE_FAIL:
        return {
          ...state,
          error: action.payload,
        }

    default:
      return state
  }
}

export default Natures
