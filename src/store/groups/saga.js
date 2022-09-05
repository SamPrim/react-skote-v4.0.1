import { call, put, takeEvery } from "redux-saga/effects"
import axios from "axios"

// Crypto Redux States
import {
  GET_GROUPS,
  GETGROUP_PROFILE,
  GETGROUP_PROFILE_SUCCESS,
  ADD_NEW_GROUP,
  DELETE_GROUP,
  UPDATE_GROUP
} from "./actionTypes"

import {
  getGroupsSuccess,
  getGroupsFail,
  getGroupProfileSuccess,
  getGroupProfileFail,
  addGroupFail,
  addGroupSuccess,
  updateGroupSuccess,
  updateGroupFail,
  deleteGroupSuccess,
  deleteGroupFail,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getGroups,
  getGroupProfile,
  addNewGroup,
  updateGroup,
  deleteGroup
} from "../../helpers/fakebackend_helper"

function* fetchGroups() {
    try {
      console.log('start groups api');
      const response = yield call(getGroups)
      console.log("test "+response);
      yield put(getGroupsSuccess(response))
    } catch (error) {
      yield put(getGroupsFail(error))
    }
}

function* onAddNewGroup({ payload: group }) {
  try {
    console.log(group);
    const response = yield call(addNewGroup, group)
    yield fetchGroups()
    // yield put(addGroupSuccess(response))
  } catch (error) {
    console.log(error);
    yield put(addGroupFail(error))
  }
}

function* onUpdateGroup({ payload: group }) {
  try {
    const response = yield call(updateGroup, group, group.id)
    yield fetchGroups()
    yield put(updateGroupSuccess(response))
  } catch (error) {
    yield put(updateGroupFail(error))
  }
}

function* onDeleteGroup({ payload: group }) {
  try {
    const response = yield call(deleteGroup, group, group.id)
    yield fetchGroups()
    yield put(deleteGroupSuccess(response))
  } catch (error) {
    yield put(deleteGroupFail(error))
  }
}

function* groupsSaga() {
  yield takeEvery(GET_GROUPS, fetchGroups)
  yield takeEvery(ADD_NEW_GROUP, onAddNewGroup)
  yield takeEvery(UPDATE_GROUP, onUpdateGroup)
  yield takeEvery(DELETE_GROUP, onDeleteGroup)
}

export default groupsSaga
