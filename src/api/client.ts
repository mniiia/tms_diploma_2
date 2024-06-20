import axios from 'axios'
import { baseEndpoint } from './endpoint'

export const client = axios.create({
  baseURL: baseEndpoint,
  timeout: 3000
})
