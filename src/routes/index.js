import React from "react"
import { Redirect } from "react-router-dom"
// User profile
import UserProfile from "../pages/Authentication/UserProfile"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

// Dashboard
import Dashboard from "../pages/Dashboard/index"
// Products
import Products from "../pages/Products"
// Users
import Users from "../pages/Users"
import User from "../pages/Users/ContactsProfile/specific.js"
import Groups from "../pages/Groups"
import Countries from "pages/Countries"
import Cities from "pages/Cities"

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },

  //profile
  { path: "/profile", component: UserProfile },

  // products
  { path: "/products", component: Products },

  // users
  { path: "/users", component: Users },

  // users
  { path: "/user/:id", component: User },

  // groups
  { path: "/groups", component: Groups },

  // countries
  { path: "/countries", component: Countries },

  // cities
  { path: "/cities", component: Cities },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> }
]

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register }
]

export { authProtectedRoutes, publicRoutes }
