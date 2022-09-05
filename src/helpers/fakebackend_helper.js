import axios from "axios"
import { del, get, post, put, API_URL } from "./api_helper"
import * as url from "./url_helper"

// Gets the logged in user data from local session
const getLoggedInUser = () => {
  const user = localStorage.getItem("authUser")
  if (user) return JSON.parse(user)
  return null
}

//is user is logged in
const isUserAuthenticated = () => {
  return getLoggedInUser() !== null
}

////////////////
// Login Method
const postJwtLogin = data => post(url.POST_FAKE_JWT_LOGIN, data)

/////////////
// get users
export const getUsers = () => get("/user/all") // add this route get all users
// add user
export const addNewUser = data => post(API_URL+"/user/create/", data) // add this route for new user
// update user
export const updateUser = (user, id) => put(API_URL+"/user/"+id+"/update", user) // add this route for update user
// delete user
export const deleteUser = (user, id) =>
  del(API_URL+"/user/"+id+"/delete", { headers: { user } }) // add this route for delete user
export const getUserProfile = id => get("/user/"+id)

/////////////
// get groups
export const getGroups = () => get("/user/groups/?skip=0&limit=100") // add this route get all groups
// add groups
export const addNewGroup = group => post("/user/group", group) // add this route add a groups
// update group
export const updateGroup = (group, id) => put(API_URL+"/user/"+id+"/update_group", group) // add this route for update group
// delete group
export const deleteGroup = (group, id) =>
  del(API_URL+"/user/group/"+id+"/delete", { headers: { group } }) // add this route for delete group

////////////////
// get countries
export const getCountries = () => get("/entrepot/countries?skip=0&limit=100") // add this route get all countries
// add countries
export const addNewCountrie = countrie => post("/entrepot/countrie", countrie) // add this route add a countries
// update countrie
export const updateCountrie = (countrie, id) => put(API_URL+"/entrepot/"+id+"/countrie", countrie) // add this route for update countrie
// delete countrie
export const deleteCountrie = (countrie, id) =>
  del(API_URL+"/entrepot/"+id+"/countrie", { headers: { countrie } }) // add this route for delete group

//////////////
// get cities
export const getCities = () => get("/entrepot/cities?skip=0&limit=100") // add this route get all cities
// add citie
export const addNewCitie= citie => post("/entrepot/citie", citie) // add this route add a cities
// update citie
export const updateCitie = (citie, id) => put(API_URL+"/entrepot/"+id+"/citie", citie) // add this route for update citie
// delete citie
export const deleteCitie = (citie, id) =>
  del(API_URL+"/entrepot/"+id+"/citie", { headers: { citie } }) // add this route for delete citie

////////////
// get local
export const getLocals = () => get("/entrepot/entrepot") // add this route to get all locals
// add local
export const addNewLocal = (local) => post(API_URL+"/entrepot/entrepot", local) // add this route to add local
// put local
export const updateLocal = (local, id) => put(API_URL+"/entrepot/"+id+"/entrepot", local) // add this route to update local
// delete local
export const deleteLocal = (local, id) => del(API_URL+"/entrepot/"+id+"/entrepot", {headers: { local }}) // add this route to delete local

///////////////
// get natures
export const getNatures = () => get("/stock/natures") // add this route to get all natures
// add nature
export const addNewNature = (nature) => post(API_URL+"/stock/nature", nature) // add this route to add nature
// put nature
export const updateNature = (nature, id) => put(API_URL+"/stock/"+id+"/nature", nature) // add this route to update nature
// delete nature
export const deleteNature = (nature, id) => del(API_URL+"/stock/"+id+"/nature", {headers: { nature }}) // add this route to delete nature

//////////////////
// get categories
export const getCategories = () => get("/stock/categories") // add this route to get all categories
// add categorie
export const addNewCategorie = (categorie) => post(API_URL+"/stock/categorie", categorie) // add this route to add categorie
// put categorie
export const updateCategorie = (categorie, id) => put(API_URL+"/stock/"+id+"/categorie", categorie) // add this route to update categorie
// delete categorie
export const deleteCategorie = (categorie, id) => del(API_URL+"/stock/"+id+"/categorie", {headers: { categorie }}) // add this route to delete categorie

/////////////////
// get deliverys
export const getDeleverys = () => get("/stock/livraisons") // add this route to get all deliverys
// add delivery
export const addNewDelevery = (delivery) => post(API_URL+"/stock/livraison", delivery) // add this route to add delivery
// put delivery
export const updateDelevery = (delivery, id) => put(API_URL+"/stock/"+id+"/livraison", delivery) // add this route to update delivery
// delete delivery
export const deleteDelevery = (delivery, id) => del(API_URL+"/stock/"+id+"/livraison", {headers: { delivery }}) // add this route to delete delivery

////////////////
// get products
export const getproducts = () => get("/stock/produits") // add this route to get all products
// add product
export const addNewProduct = (product) => post(API_URL+"/stock/produit", product) // add this route to add product
// put product
export const updateProduct = (product, id) => put(API_URL+"/stock/"+id+"/produit", product) // add this route to update product
// delete product
export const deleteProduct = (product, id) => del(API_URL+"/stock/"+id+"/produit", {headers: { product }}) // add this route to delete product

//////////////////////////////////////////////////////////////

// Register Method
const postFakeRegister = data => {
  return axios
    .post(url.POST_FAKE_REGISTER, data)
    .then(response => {
      if (response.status >= 200 || response.status <= 299) return response.data
      throw response.data
    })
    .catch(err => {
      let message
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found"
            break
          case 500:
            message =
              "Sorry! something went wrong, please contact our support team"
            break
          case 401:
            message = "Invalid credentials"
            break
          default:
            message = err[1]
            break
        }
      }
      throw message
    })
}

// Login Method
const postFakeLogin = data => post(url.POST_FAKE_LOGIN, data)

// postForgetPwd
const postFakeForgetPwd = data => post(url.POST_FAKE_PASSWORD_FORGET, data)

// User info
const getJwtProfile = data => post(url.GET_JWT_PROFILE, data) // add api request to user me

// Edit profile
const postJwtProfile = data => post(url.POST_EDIT_JWT_PROFILE, data)

const postFakeProfile = data => post(url.POST_EDIT_PROFILE, data)

// Register Method
const postJwtRegister = (url, data) => {
  return axios
    .post(url, data)
    .then(response => {
      if (response.status >= 200 || response.status <= 299) return response.data
      throw response.data
    })
    .catch(err => {
      var message
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found"
            break
          case 500:
            message =
              "Sorry! something went wrong, please contact our support team"
            break
          case 401:
            message = "Invalid credentials"
            break
          default:
            message = err[1]
            break
        }
      }
      throw message
    })
}

// postForgetPwd
const postJwtForgetPwd = data => post(url.POST_FAKE_JWT_PASSWORD_FORGET, data)

// postSocialLogin
export const postSocialLogin = data => post(url.SOCIAL_LOGIN, data)




// get Products
export const getProducts = () => get(url.GET_PRODUCTS)

// get Product detail
export const getProductDetail = id =>
  get(`${url.GET_PRODUCTS_DETAIL}/${id}`, { params: { id } })

// get Events
export const getEvents = () => get(url.GET_EVENTS)

// add Events
export const addNewEvent = event => post(url.ADD_NEW_EVENT, event)

// update Event
export const updateEvent = event => put(url.UPDATE_EVENT, event)

// delete Event
export const deleteEvent = event =>
  del(url.DELETE_EVENT, { headers: { event } })

// get chats
export const getChats = () => get(url.GET_CHATS)

// get Contacts
export const getContacts = () => get(url.GET_CONTACTS)


// get messages
export const getMessages = (roomId = "") =>
  get(`${url.GET_MESSAGES}/${roomId}`, { params: { roomId } })

// post messages
export const addMessage = message => post(url.ADD_MESSAGE, message)

// get orders
export const getOrders = () => get(url.GET_ORDERS)

// add order
export const addNewOrder = order => post(url.ADD_NEW_ORDER, order)

// update order
export const updateOrder = order => put(url.UPDATE_ORDER, order)

// delete order
export const deleteOrder = order =>
  del(url.DELETE_ORDER, { headers: { order } })

// get cart data
export const getCartData = () => get(url.GET_CART_DATA)

// get customers
export const getCustomers = () => get(url.GET_CUSTOMERS)

// add customer
export const addNewCustomer = customer => post(url.ADD_NEW_CUSTOMER, customer)

// update customer
export const updateCustomer = customer => put(url.UPDATE_CUSTOMER, customer)

// delete customer
export const deleteCustomer = customer =>
  del(url.DELETE_CUSTOMER, { headers: { customer } })

// get shops
export const getShops = () => get(url.GET_SHOPS)

// get wallet
export const getWallet = () => get(url.GET_WALLET)

// get crypto order
export const getCryptoOrder = () => get(url.GET_CRYPTO_ORDERS)

// get invoices
export const getInvoices = () => get(url.GET_INVOICES)

// get invoice details
export const getInvoiceDetail = id =>
  get(`${url.GET_INVOICE_DETAIL}/${id}`, { params: { id } })

// get project
export const getProjects = () => get(url.GET_PROJECTS)

// get project details
export const getProjectsDetails = id =>
  get(`${url.GET_PROJECT_DETAIL}/${id}`, { params: { id } })

// add project
export const addNewProject = project => post(url.ADD_NEW_PROJECT, project)

// update project
export const updateProject = project => put(url.UPDATE_PROJECT, project)

// delete project
export const deleteProject = project =>
  del(url.DELETE_PROJECT, { headers: { project } })

// get tasks
export const getTasks = () => get(url.GET_TASKS)

// get inboxmail
export const getInboxMails = () => get(url.GET_INBOX_MAILS)

// add inboxmail
export const addNewInboxMail = inboxmail => post(url.ADD_NEW_INBOX_MAIL, inboxmail)

// delete inboxmail
export const deleteInboxMail = inboxmail =>
  del(url.DELETE_INBOX_MAIL, { headers: { inboxmail } })

// get starredmail
export const getStarredMails = () => get(url.GET_STARRED_MAILS)
// get importantmail
export const getImportantMails = () => get(url.GET_IMPORTANT_MAILS)

// get sent mail
export const getSentMails = () => get(url.GET_SENT_MAILS)

// get trash mail
export const getTrashMails = () => get(url.GET_TRASH_MAILS)

// get starredmail
export const getDraftMails = () => get(url.GET_DRAFT_MAILS)

// get dashboard charts data
export const getWeeklyData = () => get(url.GET_WEEKLY_DATA);
export const getYearlyData = () => get(url.GET_YEARLY_DATA);
export const getMonthlyData = () => get(url.GET_MONTHLY_DATA);

export const topSellingData = month =>
  get(`${url.TOP_SELLING_DATA}/${month}`, { params: { month } })

export const getEarningChartsData = month =>
  get(`${url.GET_EARNING_DATA}/${month}`, { params: { month } })

export {
  getLoggedInUser,
  isUserAuthenticated,
  postFakeRegister,
  postFakeLogin,
  postFakeProfile,
  postFakeForgetPwd,
  postJwtRegister,
  postJwtLogin,
  postJwtForgetPwd,
  postJwtProfile,
  getJwtProfile
}
