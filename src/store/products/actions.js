import {
  GET_PRODUCTS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_SUCCESS,
  ADD_NEW_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
} from "./actionTypes"

export const getProducts = () => ({
  type: GET_PRODUCTS,
})

export const getProductsSuccess = categories => ({
  type: GET_PRODUCTS_SUCCESS,
  payload: categories,
})

export const getProductsFail = error => ({
  type: GET_PRODUCTS_FAIL,
  payload: error,
})

export const addNewProduct = categorie => ({
  type: ADD_NEW_PRODUCT,
  payload: categorie,
})

export const addProductSuccess = categorie => ({
  type: ADD_PRODUCT_SUCCESS,
  payload: categorie,
})

export const addProductFail = error => ({
  type: ADD_PRODUCT_FAIL,
  payload: error,
})

export const updateProduct = categorie => ({
  type: UPDATE_PRODUCT,
  payload: categorie,
})

export const updateProductSuccess = categorie => ({
  type: UPDATE_PRODUCT_SUCCESS,
  payload: categorie,
})

export const updateProductFail = error => ({
  type: UPDATE_PRODUCT_FAIL,
  payload: error,
})

export const deleteProduct = categorie => ({
  type: DELETE_PRODUCT,
  payload: categorie,
})

export const deleteProductSuccess = categorie => ({
  type: DELETE_PRODUCT_SUCCESS,
  payload: categorie,
})

export const deleteProductFail = error => ({
  type: DELETE_PRODUCT_FAIL,
  payload: error,
})
