import {
  GET_COUNTRIES_SUCCESS,
  GET_COUNTRIES_FAIL,
  ADD_COUNTRIE_SUCCESS,
  ADD_COUNTRIE_FAIL,
  UPDATE_COUNTRIE_SUCCESS,
  UPDATE_COUNTRIE_FAIL,
  DELETE_COUNTRIE_SUCCESS,
  DELETE_COUNTRIE_FAIL
} from "./actionTypes"

const INIT_STATE = {
  countries: [],
  error: false,
}

const Countries = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_COUNTRIES_SUCCESS:
      return {
        ...state,
        countries: action.payload,
      }

    case GET_COUNTRIES_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_COUNTRIE_SUCCESS:
      return {
        ...state,
        countries: [...state.countries, action.payload],
      }

    case ADD_COUNTRIE_FAIL:
      return {
        ...state,
        error: action.payload,
      }
      
      case UPDATE_COUNTRIE_SUCCESS:
        return {
          ...state,
          countries: state.countries.map(countrie =>
            countrie.id.toString() === action.payload.id.toString()
              ? { countrie, ...action.payload }
              : countrie
          ),
        }

      case UPDATE_COUNTRIE_FAIL:
        return {
          ...state,
          error: action.payload,
        }
  
      case DELETE_COUNTRIE_SUCCESS:
        return {
          ...state,
          countries: state.countries.filter(
            countrie => countrie.id.toString() !== action.payload.id.toString()
          ),
        }
  
      case DELETE_COUNTRIE_FAIL:
        return {
          ...state,
          error: action.payload,
        }

    default:
      return state
  }
}

export default Countries
