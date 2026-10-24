import axios from 'axios'
import { getSessionId } from '../lib/session'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 12000,
  headers: { Accept: 'application/json' },
})

api.interceptors.request.use((config) => {
  config.headers['X-Session-Id'] = getSessionId()
  return config
})

export async function fetchJson(path, params) {
  const response = await api.get(path, { params })
  return response.data
}

export default api
