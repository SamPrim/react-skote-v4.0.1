import {
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL,
  ADD_CATEGORIE_SUCCESS,
  ADD_CATEGORIE_FAIL,
  UPDATE_CATEGORIE_SUCCESS,
  UPDATE_CATEGORIE_FAIL,
  DELETE_CATEGORIE_SUCCESS,
  DELETE_CATEGORIE_FAIL
} from "./actionTypes"

const INIT_STATE = {
  categories: [],
  error: false,
}

const Categories = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
      }

    case GET_CATEGORIES_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_CATEGORIE_SUCCESS:
      return {
        ...state,
        categories: [...state.categories, action.payload],
      }

    case ADD_CATEGORIE_FAIL:
      return {
        ...state,
        error: action.payload,
      }
      
      case UPDATE_CATEGORIE_SUCCESS:
        return {
          ...state,
          categories: state.categories.map(categorie =>
            categorie.id.toString() === action.payload.id.toString()
              ? { categorie, ...action.payload }
              : categorie
          ),
        }

      case UPDATE_CATEGORIE_FAIL:
        return {
          ...state,
          error: action.payload,
        }
  
      case DELETE_CATEGORIE_SUCCESS:
        return {
          ...state,
          categories: state.categories.filter(
            categorie => categorie.id.toString() !== action.payload.id.toString()
          ),
        }
  
      case DELETE_CATEGORIE_FAIL:
        return {
          ...state,
          error: action.payload,
        }

    default:
      return state
  }
}

export default Categories
