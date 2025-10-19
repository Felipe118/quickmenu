import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api', 
  timeout: 100000,
})

const token = localStorage.getItem('token')

console.log(token ?? token == 'undefined')

if (token && token !== 'undefined' && token !== 'null') {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
} 

export default api
