import { call, put, takeEvery } from "redux-saga/effects"
import axios from "axios"

// Crypto Redux States
import {
  GET_INVENTORY,
  ADD_NEW_INVENTORY,
  DELETE_INVENTORY,
  UPDATE_INVENTORY
} from "./actionTypes"

import {
  getInventorySuccess,
  getInventoryFail,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getInventory
} from "../../helpers/fakebackend_helper"

function* fetchInventory({payload: search}) {
    try {
      search = {"name":"", "categorie_id":1, "start":"", "end":""}
      console.log(search);
      const response = yield call(getInventory, search.name ?search.name:'', search.categorie_id, search.start , search.end)
      yield put(getInventorySuccess(response))
    } catch (error) {
      yield put(getInventoryFail(error))
    }
}


function* inventorysSaga() {
  yield takeEvery(GET_INVENTORY, fetchInventory)
}

export default inventorysSaga
