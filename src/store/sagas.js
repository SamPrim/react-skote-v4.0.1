import { all, fork } from "redux-saga/effects"

//public
import AccountSaga from "./auth/register/saga"
import AuthSaga from "./auth/login/saga"
import ForgetSaga from "./auth/forgetpwd/saga"
import ProfileSaga from "./auth/profile/saga"
import LayoutSaga from "./layout/saga"
import ecommerceSaga from "./e-commerce/saga"
import countriesSaga from "./countries/saga"
import chatSaga from "./chat/saga"
import cryptoSaga from "./crypto/saga"
import invoiceSaga from "./invoices/saga"
import projectsSaga from "./projects/saga"
import tasksSaga from "./tasks/saga"
import mailsSaga from "./mails/saga"
import contactsSaga from "./contacts/saga";
import dashboardSaga from "./dashboard/saga";
import dashboardSaasSaga from "./dashboard-saas/saga";
import groupSaga from "./groups/saga";
import citiesSaga from "./cities/saga";
import localsSaga from "./local/saga";
import naturesSaga from "./natures/saga"
import categoriesSaga from "./categories/saga"
import deleverysSaga from "./delevery/saga"
import productsSaga from "./products/saga"
import inventorysSaga from "./inventory/saga"
import locationsSaga from "./location/saga"
import transfertsSaga from "./transfert/saga"

export default function* rootSaga() {
  yield all([
    //public
    fork(AccountSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(LayoutSaga),
    fork(ecommerceSaga),
    fork(countriesSaga),
    fork(chatSaga),
    fork(mailsSaga),
    fork(cryptoSaga),
    fork(invoiceSaga),
    fork(projectsSaga),
    fork(tasksSaga),
    fork(contactsSaga),
    fork(dashboardSaga),
    fork(dashboardSaasSaga),
    fork(groupSaga),
    fork(citiesSaga),
    fork(localsSaga),
    fork(naturesSaga),
    fork(categoriesSaga),
    fork(deleverysSaga),
    fork(productsSaga),
    fork(inventorysSaga), 
    fork(locationsSaga),
    fork(transfertsSaga),
  ])
}
