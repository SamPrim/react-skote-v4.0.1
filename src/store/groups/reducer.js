import {
  GET_GROUPS_SUCCESS,
  GET_GROUPS_FAIL,
  ADD_GROUP_SUCCESS,
  ADD_GROUP_FAIL,
  UPDATE_GROUP_SUCCESS,
  UPDATE_GROUP_FAIL,
  DELETE_GROUP_SUCCESS,
  DELETE_GROUP_FAIL
} from "./actionTypes"

const INIT_STATE = {
  groups: [],
  error: false,
}

const Groups = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_GROUPS_SUCCESS:
      return {
        ...state,
        groups: action.payload,
      }

    case GET_GROUPS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_GROUP_SUCCESS:
      return {
        ...state,
        groups: [...state.groups, action.payload],
      }

    case ADD_GROUP_FAIL:
      return {
        ...state,
        error: action.payload,
      }
      
      case UPDATE_GROUP_SUCCESS:
        return {
          ...state,
          groups: state.groups.map(group =>
            group.id.toString() === action.payload.id.toString()
              ? { group, ...action.payload }
              : group
          ),
        }

      case UPDATE_GROUP_FAIL:
        return {
          ...state,
          error: action.payload,
        }
  
      case DELETE_GROUP_SUCCESS:
        return {
          ...state,
          groups: state.groups.filter(
            group => group.id.toString() !== action.payload.id.toString()
          ),
        }
  
      case DELETE_GROUP_FAIL:
        return {
          ...state,
          error: action.payload,
        }

    default:
      return state
  }
}

export default Groups
