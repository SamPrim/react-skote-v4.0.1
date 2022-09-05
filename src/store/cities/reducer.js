import {
  GET_CITIES_SUCCESS,
  GET_CITIES_FAIL,
  ADD_CITIE_SUCCESS,
  ADD_CITIE_FAIL,
  UPDATE_CITIE_SUCCESS,
  UPDATE_CITIE_FAIL,
  DELETE_CITIE_SUCCESS,
  DELETE_CITIE_FAIL
} from "./actionTypes"

const INIT_STATE = {
  cities: [],
  error: false,
}

const Cities = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CITIES_SUCCESS:
      return {
        ...state,
        cities: action.payload,
      }

    case GET_CITIES_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_CITIE_SUCCESS:
      return {
        ...state,
        cities: [...state.cities, action.payload],
      }

    case ADD_CITIE_FAIL:
      return {
        ...state,
        error: action.payload,
      }
      
      case UPDATE_CITIE_SUCCESS:
        return {
          ...state,
          cities: state.cities.map(citie =>
            citie.id.toString() === action.payload.id.toString()
              ? { citie, ...action.payload }
              : citie
          ),
        }

      case UPDATE_CITIE_FAIL:
        return {
          ...state,
          error: action.payload,
        }
  
      case DELETE_CITIE_SUCCESS:
        return {
          ...state,
          cities: state.cities.filter(
            citie => citie.id.toString() !== action.payload.id.toString()
          ),
        }
  
      case DELETE_CITIE_FAIL:
        return {
          ...state,
          error: action.payload,
        }

    default:
      return state
  }
}

export default Cities
