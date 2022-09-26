import {
  GET_LOCATIONS_SUCCESS,
  GET_LOCATIONS_FAIL,
  ADD_LOCATION_SUCCESS,
  ADD_LOCATION_FAIL,
  UPDATE_LOCATION_SUCCESS,
  UPDATE_LOCATION_FAIL,
  DELETE_LOCATION_SUCCESS,
  DELETE_LOCATION_FAIL
} from "./actionTypes"

const INIT_STATE = {
  locations: [],
  error: false,
}

const Locations = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_LOCATIONS_SUCCESS:
      return {
        ...state,
        locations: action.payload,
      }

    case GET_LOCATIONS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_LOCATION_SUCCESS:
      return {
        ...state,
        locations: [...state.locations, action.payload],
      }

    case ADD_LOCATION_FAIL:
      return {
        ...state,
        error: action.payload,
      }
      
      case UPDATE_LOCATION_SUCCESS:
        return {
          ...state,
          locations: state.locations.map(location =>
            location.id.toString() === action.payload.id.toString()
              ? { location, ...action.payload }
              : location
          ),
        }

      case UPDATE_LOCATION_FAIL:
        return {
          ...state,
          error: action.payload,
        }
  
      case DELETE_LOCATION_SUCCESS:
        return {
          ...state,
          locations: state.locations.filter(
            location => location.id.toString() !== action.payload.id.toString()
          ),
        }
  
      case DELETE_LOCATION_FAIL:
        return {
          ...state,
          error: action.payload,
        }

    default:
      return state
  }
}

export default Locations
