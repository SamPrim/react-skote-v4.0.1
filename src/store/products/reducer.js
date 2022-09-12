import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL
} from "./actionTypes"

const INIT_STATE = {
  products: [],
  error: false,
}

const Products = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
      }

    case GET_PRODUCTS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        products: [...state.products, action.payload],
      }

    case ADD_PRODUCT_FAIL:
      return {
        ...state,
        error: action.payload,
      }
      
      case UPDATE_PRODUCT_SUCCESS:
        return {
          ...state,
          products: state.products.map(product =>
            product.id.toString() === action.payload.id.toString()
              ? { product, ...action.payload }
              : product
          ),
        }

      case UPDATE_PRODUCT_FAIL:
        return {
          ...state,
          error: action.payload,
        }
  
      case DELETE_PRODUCT_SUCCESS:
        return {
          ...state,
          products: state.products.filter(
            product => product.id.toString() !== action.payload.id.toString()
          ),
        }
  
      case DELETE_PRODUCT_FAIL:
        return {
          ...state,
          error: action.payload,
        }

    default:
      return state
  }
}

export default Products
