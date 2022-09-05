import {
  GET_CATEGORIES,
  GET_CATEGORIES_FAIL,
  GET_CATEGORIES_SUCCESS,
  ADD_NEW_CATEGORIE,
  ADD_CATEGORIE_SUCCESS,
  ADD_CATEGORIE_FAIL,
  UPDATE_CATEGORIE,
  UPDATE_CATEGORIE_SUCCESS,
  UPDATE_CATEGORIE_FAIL,
  DELETE_CATEGORIE,
  DELETE_CATEGORIE_SUCCESS,
  DELETE_CATEGORIE_FAIL,
} from "./actionTypes"

export const getCategories = () => ({
  type: GET_CATEGORIES,
})

export const getCategoriesSuccess = categories => ({
  type: GET_CATEGORIES_SUCCESS,
  payload: categories,
})

export const getCategoriesFail = error => ({
  type: GET_CATEGORIES_FAIL,
  payload: error,
})

export const addNewCategorie = categorie => ({
  type: ADD_NEW_CATEGORIE,
  payload: categorie,
})

export const addCategorieSuccess = categorie => ({
  type: ADD_CATEGORIE_SUCCESS,
  payload: categorie,
})

export const addCategorieFail = error => ({
  type: ADD_CATEGORIE_FAIL,
  payload: error,
})

export const updateCategorie = categorie => ({
  type: UPDATE_CATEGORIE,
  payload: categorie,
})

export const updateCategorieSuccess = categorie => ({
  type: UPDATE_CATEGORIE_SUCCESS,
  payload: categorie,
})

export const updateCategorieFail = error => ({
  type: UPDATE_CATEGORIE_FAIL,
  payload: error,
})

export const deleteCategorie = categorie => ({
  type: DELETE_CATEGORIE,
  payload: categorie,
})

export const deleteCategorieSuccess = categorie => ({
  type: DELETE_CATEGORIE_SUCCESS,
  payload: categorie,
})

export const deleteCategorieFail = error => ({
  type: DELETE_CATEGORIE_FAIL,
  payload: error,
})
