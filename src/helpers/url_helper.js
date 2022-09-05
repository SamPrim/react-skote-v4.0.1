//REGISTER
export const POST_FAKE_REGISTER = "/post-fake-register"

//LOGIN
export const POST_FAKE_LOGIN = "/post-fake-login"
export const POST_FAKE_JWT_LOGIN = "/user/login"
export const POST_FAKE_PASSWORD_FORGET = "/fake-forget-pwd"
export const POST_FAKE_JWT_PASSWORD_FORGET = "/jwt-forget-pwd"
export const SOCIAL_LOGIN = "/social-login"

//PROFILE
export const GET_JWT_PROFILE = "/user/me"
export const POST_EDIT_JWT_PROFILE = "/post-jwt-profile"
export const POST_EDIT_PROFILE = "/post-fake-profile"

//USERS
export const GET_USERS = "/user/all?skip=0&limit=100"
export const GET_USER_PROFILE = "/user/{id}"
export const ADD_NEW_USER = "/user/create"
export const UPDATE_USER = "/user/{id}/update"
export const DELETE_USER = "/user/{id}/delete"

export const CHANGE_PASSWORD = "/user/{id}/change_password"



//PRODUCTS
export const GET_PRODUCTS = "/products"
export const GET_PRODUCTS_DETAIL = "/product"
export const ADD_NEW_PROJECT = "/add/product"
export const UPDATE_PROJECT = "/update/product"
export const DELETE_PROJECT = "/delete/product"

//CALENDER
export const GET_EVENTS = "/events"
export const ADD_NEW_EVENT = "/add/event"
export const UPDATE_EVENT = "/update/event"
export const DELETE_EVENT = "/delete/event"
export const GET_CATEGORIES = "/categories"

//CHATS
export const GET_CHATS = "/chats"
export const GET_GROUPS = "/user/groups/"
export const GET_CONTACTS = "/contacts"
export const GET_MESSAGES = "/messages"
export const ADD_MESSAGE = "/add/messages"

//ORDERS
export const GET_ORDERS = "/orders"
export const ADD_NEW_ORDER = "/add/order"
export const UPDATE_ORDER = "/update/order"
export const DELETE_ORDER = "/delete/order"

//CART DATA
export const GET_CART_DATA = "/cart"

//CUSTOMERS
export const GET_CUSTOMERS = "/customers"
export const ADD_NEW_CUSTOMER = "/add/customer"
export const UPDATE_CUSTOMER = "/update/customer"
export const DELETE_CUSTOMER = "/delete/customer"

//SHOPS
export const GET_SHOPS = "/shops"

//CRYPTO
export const GET_WALLET = "/wallet"
export const GET_CRYPTO_ORDERS = "/crypto/orders"

//INVOICES
export const GET_INVOICES = "/invoices"
export const GET_INVOICE_DETAIL = "/invoice"

//PROJECTS
export const GET_PROJECTS = "/projects"
export const GET_PROJECT_DETAIL = "/project"

//TASKS
export const GET_TASKS = "/tasks"


//Mails
export const GET_INBOX_MAILS = "/inboxmails"
export const ADD_NEW_INBOX_MAIL = "/add/inboxmail"
export const DELETE_INBOX_MAIL = "/delete/inboxmail"

//starred mail
export const GET_STARRED_MAILS = "/starredmails"

//important mails
export const GET_IMPORTANT_MAILS = "/importantmails"

//Draft mail
export const GET_DRAFT_MAILS = "/draftmails"

//Send mail
export const GET_SENT_MAILS = "/sentmails"

//Trash mail
export const GET_TRASH_MAILS = "/trashmails"

//dashboard charts data
export const GET_WEEKLY_DATA = "/weekly-data"
export const GET_YEARLY_DATA = "/yearly-data"
export const GET_MONTHLY_DATA = "/monthly-data"

export const TOP_SELLING_DATA = "/top-selling-data"

export const GET_EARNING_DATA = "/earning-charts-data"