import { call, put, takeEvery } from "redux-saga/effects"
import axios from "axios"

// Crypto Redux States
import {
  GET_USERS,
  GET_USER_PROFILE,
  GET_USER_PROFILE_SUCCESS,
  ADD_NEW_USER,
  DELETE_USER,
  UPDATE_USER
} from "./actionTypes"

import {
  getUsersSuccess,
  getUsersFail,
  getUserProfileSuccess,
  getUserProfileFail,
  addUserFail,
  addUserSuccess,
  updateUserSuccess,
  updateUserFail,
  deleteUserSuccess,
  deleteUserFail,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getUsers,
  getUserProfile,
  addNewUser,
  updateUser,
  deleteUser
} from "../../helpers/fakebackend_helper"

function* fetchUsers() {
    try {
      const response = yield call(getUsers)
      yield put(getUsersSuccess(response))
    } catch (error) {
      yield put(getUsersFail(error))
    }
}

function* fetchUserProfile({payload: id}) {
  try {
    const response = yield call(getUserProfile, id)
    yield put(getUserProfileSuccess(response))
  } catch (error) {
    yield put(getUserProfileFail(true))
  }
}

function* onAddNewUser({ payload: user }) {
  try {
    console.log(user);
    const response = yield call(addNewUser, user)
    yield fetchUsers()
    // yield put(addUserSuccess(response))
  } catch (error) {
    console.log(error);
    yield put(addUserFail(error))
  }
}

function* onUpdateUser({ payload: user }) {
  try {
    const response = yield call(updateUser, user, user.id)
    yield fetchUsers()
    yield put(updateUserSuccess(response))
  } catch (error) {
    yield put(updateUserFail(error))
  }
}

function* onDeleteUser({ payload: user }) {
  try {
    const response = yield call(deleteUser, user, user.id)
    yield fetchUsers()
    yield put(deleteUserSuccess(response))
  } catch (error) {
    yield put(deleteUserFail(error))
  }
}

function* contactsSaga() {
  yield takeEvery(GET_USERS, fetchUsers)
  yield takeEvery(GET_USER_PROFILE, fetchUserProfile)
  yield takeEvery(ADD_NEW_USER, onAddNewUser)
  yield takeEvery(UPDATE_USER, onUpdateUser)
  yield takeEvery(DELETE_USER, onDeleteUser)
}

export default contactsSaga
