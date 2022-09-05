import { call, put, takeEvery } from "redux-saga/effects"
import axios from "axios"

// Crypto Redux States
import {
  GET_CATEGORIES,
  ADD_NEW_CATEGORIE,
  DELETE_CATEGORIE,
  UPDATE_CATEGORIE
} from "./actionTypes"

import {
  getCategoriesSuccess,
  getCategoriesFail,
  addCategorieFail,
  updateCategorieFail,
  deleteCategorieSuccess,
  deleteCategorieFail,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getCategories,
  addNewCategorie,
  updateCategorie,
  deleteCategorie
} from "../../helpers/fakebackend_helper"

function* fetchCategories() {
    try {
      const response = yield call(getCategories)
      yield put(getCategoriesSuccess(response))
    } catch (error) {
      yield put(getCategoriesFail(error))
    }
}

function* onAddNewCategorie({ payload: categorie }) {
  try {
    const response = yield call(addNewCategorie, categorie)
    yield fetchCategories()
    // yield put(addGroupSuccess(response))
  } catch (error) {
    console.log(error);
    yield put(addCategorieFail(error))
  }
}

function* onUpdateCategorie({ payload: categorie }) {
  try {
    const response = yield call(updateCategorie, categorie, categorie.id)
    yield fetchCategories()
    // yield put(updateCategorieSuccess(response))
  } catch (error) {
    yield put(updateCategorieFail(error))
  }
}

function* onDeleteCategorie({ payload: categorie }) {
  try {
    const response = yield call(deleteCategorie, categorie, categorie.id)
    yield fetchCategories()
    yield put(deleteCategorieSuccess(response))
  } catch (error) {
    yield put(deleteCategorieFail(error))
  }
}

function* categoriesSaga() {
  yield takeEvery(GET_CATEGORIES, fetchCategories)
  yield takeEvery(ADD_NEW_CATEGORIE, onAddNewCategorie)
  yield takeEvery(UPDATE_CATEGORIE, onUpdateCategorie)
  yield takeEvery(DELETE_CATEGORIE, onDeleteCategorie)
}

export default categoriesSaga
