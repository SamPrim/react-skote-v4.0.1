import {
  GET_GROUPS,
  GET_GROUPS_FAIL,
  GET_GROUPS_SUCCESS,
  ADD_NEW_GROUP,
  ADD_GROUP_SUCCESS,
  ADD_GROUP_FAIL,
  UPDATE_GROUP,
  UPDATE_GROUP_SUCCESS,
  UPDATE_GROUP_FAIL,
  DELETE_GROUP,
  DELETE_GROUP_SUCCESS,
  DELETE_GROUP_FAIL,
} from "./actionTypes"

export const getGroups = () => ({
  type: GET_GROUPS,
})

export const getGroupsSuccess = groups => ({
  type: GET_GROUPS_SUCCESS,
  payload: groups,
})

export const getGroupsFail = error => ({
  type: GET_GROUPS_FAIL,
  payload: error,
})

export const getGroupProfile = id => ({
  type: GET_GROUPS,
  payload: id
})

export const getGroupProfileSuccess = groupProfile => ({
  type: GET_GROUPS_SUCCESS,
  payload: groupProfile,
})

export const getGroupProfileFail = error => ({
  type: GET_GROUPS_FAIL,
  payload: error,
})

export const addNewGroup = group => ({
  type: ADD_NEW_GROUP,
  payload: group,
})

export const addGroupSuccess = group => ({
  type: ADD_GROUP_SUCCESS,
  payload: group,
})

export const addGroupFail = error => ({
  type: ADD_GROUP_FAIL,
  payload: error,
})

export const updateGroup = group => ({
  type: UPDATE_GROUP,
  payload: group,
})

export const updateGroupSuccess = group => ({
  type: UPDATE_GROUP_SUCCESS,
  payload: group,
})

export const updateGroupFail = error => ({
  type: UPDATE_GROUP_FAIL,
  payload: error,
})

export const deleteGroup = group => ({
  type: DELETE_GROUP,
  payload: group,
})

export const deleteGroupSuccess = group => ({
  type: DELETE_GROUP_SUCCESS,
  payload: group,
})

export const deleteGroupFail = error => ({
  type: DELETE_GROUP_FAIL,
  payload: error,
})
