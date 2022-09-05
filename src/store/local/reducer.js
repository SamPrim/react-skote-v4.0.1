import {
  GET_LOCALS_SUCCESS,
  GET_LOCALS_FAIL,
  ADD_LOCAL_SUCCESS,
  ADD_LOCAL_FAIL,
  UPDATE_LOCAL_SUCCESS,
  UPDATE_LOCAL_FAIL,
  DELETE_LOCAL_SUCCESS,
  DELETE_LOCAL_FAIL
} from "./actionTypes"

const INIT_STATE = {
  locals: [],
  error: false,
}

const Locals = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_LOCALS_SUCCESS:
      return {
        ...state,
        locals: action.payload,
      }

    case GET_LOCALS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_LOCAL_SUCCESS:
      return {
        ...state,
        locals: [...state.locals, action.payload],
      }

    case ADD_LOCAL_FAIL:
      return {
        ...state,
        error: action.payload,
      }
      
      case UPDATE_LOCAL_SUCCESS:
        return {
          ...state,
          locals: state.locals.map(local =>
            local.id.toString() === action.payload.id.toString()
              ? { local, ...action.payload }
              : local
          ),
        }

      case UPDATE_LOCAL_FAIL:
        return {
          ...state,
          error: action.payload,
        }
  
      case DELETE_LOCAL_SUCCESS:
        return {
          ...state,
          locals: state.locals.filter(
            local => local.id.toString() !== action.payload.id.toString()
          ),
        }
  
      case DELETE_LOCAL_FAIL:
        return {
          ...state,
          error: action.payload,
        }

    default:
      return state
  }
}

export default Locals
