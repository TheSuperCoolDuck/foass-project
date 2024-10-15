import axios from 'axios'

export const foass_axios = axios.create({
  // baseURL: 'https://foass.1001010.com',
  baseURL: '/api',
  headers: {
    Accept: 'text/plain'
    // 'Access-Control-Allow-Origin': '*'
  }
})
