import axios from 'axios'

const instance = axios.create({
  timeout: 10000,
  baseURL: import.meta.env.VITE_API_ENDPOINT
})

export default instance;