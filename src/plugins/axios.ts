import axios from 'axios'

export const foass_axios = axios.create({
  baseURL: 'https://foass.1001010.com',
  headers: {
    Accept: 'text/plain'
  }
})
