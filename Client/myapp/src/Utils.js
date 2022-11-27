import axios from 'axios'

//Check accessToken
const authHeader = () => {
  const accessToken = sessionStorage["userToken"]
  if (accessToken) {
    return { headers: { 'authorization': `Bearer ${accessToken}` } }

  } else {
    return {}
  }
}

const PrivateData = (url) => { return axios.get(url, authHeader()) }

const getDataById = (url, id) => { return axios.get(`${url}/${id}`, authHeader()) }

const addItem = (url, obj) => { return axios.post(url, obj, authHeader()) }

const updateItem = (url, id, obj) => { return axios.put(`${url}/${id}`, obj, authHeader()) }

const deleteItem = (url, id) => { return axios.delete(`${url}/${id}`, authHeader()) }


// eslint-disable-next-line
export default { PrivateData, getDataById, addItem, updateItem, deleteItem }

