import { call, put, takeEvery } from "redux-saga/effects"
import axios from "axios"

// Crypto Redux States
import {
  GET_PRODUCTS,
  ADD_NEW_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT
} from "./actionTypes"

import {
  getProductsSuccess,
  getProductsFail,
  addProductFail,
  updateProductFail,
  deleteProductSuccess,
  deleteProductFail,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getProducts,
  addNewProduct,
  updateProduct,
  deleteProduct
} from "../../helpers/fakebackend_helper"

function* fetchProducts() {
    try {
      const response = yield call(getProducts)
      yield put(getProductsSuccess(response))
    } catch (error) {
      yield put(getProductsFail(error))
    }
}

function* onAddNewProduct({ payload: product }) {
  try {
    const response = yield call(addNewProduct, product)
    yield fetchProducts()
    // yield put(addGroupSuccess(response))
  } catch (error) {
    console.log(error);
    yield put(addProductFail(error))
  }
}

function* onUpdateProduct({ payload: product }) {
  try {
    const response = yield call(updateProduct, product, product.id)
    yield fetchProducts()
    // yield put(updateProductSuccess(response))
  } catch (error) {
    yield put(updateProductFail(error))
  }
}

function* onDeleteProduct({ payload: product }) {
  try {
    const response = yield call(deleteProduct, product, product.id)
    yield fetchProducts()
    yield put(deleteProductSuccess(response))
  } catch (error) {
    yield put(deleteProductFail(error))
  }
}

function* productsSaga() {
  yield takeEvery(GET_PRODUCTS, fetchProducts)
  yield takeEvery(ADD_NEW_PRODUCT, onAddNewProduct)
  yield takeEvery(UPDATE_PRODUCT, onUpdateProduct)
  yield takeEvery(DELETE_PRODUCT, onDeleteProduct)
}

export default productsSaga
