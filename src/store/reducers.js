import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"
import Account from "./auth/register/reducer"
import ForgetPassword from "./auth/forgetpwd/reducer"
import Profile from "./auth/profile/reducer"

//E-commerce
import ecommerce from "./e-commerce/reducer"

//Countries
import Countries from "./countries/reducer"

//chat
import chat from "./chat/reducer"

//crypto
import crypto from "./crypto/reducer"

//invoices
import invoices from "./invoices/reducer"

//projects
import projects from "./projects/reducer"

//tasks
import tasks from "./tasks/reducer"

//contacts
import contacts from "./contacts/reducer"

//mails
import mails from "./mails/reducer";

//Dashboard 
import Dashboard from "./dashboard/reducer";

//Dasboard saas
import DashboardSaas from "./dashboard-saas/reducer";

//Groups
import Groups from "./groups/reducer";

// Locals
import Locals from "./local/reducer";

// Cities
import Cities from "./cities/reducer";

// Natures
import Natures from "./natures/reducer";

// Categories
import Categories from "./categories/reducer";

// Delevery
import Deleverys from "./delevery/reducer"

// Products
import Products from "./products/reducer"

// Inventory
import Inventory from "./inventory/reducer"

// Locations
import Locations from "./location/reducer"

// Transferts
import Transferts from "./transfert/reducer"

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  ecommerce,
  Countries, // add
  chat,
  mails,
  crypto,
  invoices,
  projects,
  tasks,
  contacts, 
  Dashboard,
  DashboardSaas,
  Groups, // add
  Cities, // add
  Locals, // add
  Natures, // add
  Categories, // add
  Deleverys, // add
  Products, // add
  Inventory, // add
  Locations, // add
  Transferts, //add
})

export default rootReducer
