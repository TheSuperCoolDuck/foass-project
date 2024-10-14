import type { AxiosRequestConfig } from 'axios'
import { foass_axios } from '@/plugins/axios'

export async function backendRequest(
  url: string,
  options: AxiosRequestConfig | undefined = undefined
): Promise<any> {
  const defaultOptions = options || {
    method: 'get'
  }

  try {
    const response = await foass_axios({
      url,
      ...defaultOptions
    })

    return Promise.resolve(response)
  } catch (error: any) {
    console.log(error)

    return Promise.reject({
      status: error.response.status,
      statusText: error.response.statusText,
      stack: error.stack,
      ...error.response.data.message
    })
  }
}

export function getIty(name: string, from: string) {
  return backendRequest(`/ity/${name}/${from}`)
}
