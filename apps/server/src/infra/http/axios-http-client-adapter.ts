import {
  HttpClient,
  HttpClientOptions,
  HttpClientResponse,
} from '@/data/protocols/http/http-client'
import axios, { isAxiosError } from 'axios'

export class AxiosHttpClientAdapter implements HttpClient {
  async post<T = unknown>(
    url: string,
    options?: HttpClientOptions | undefined,
  ): Promise<HttpClientResponse<T>> {
    try {
      const { data, status } = await axios.post(url, options?.body, {
        headers: {
          Authorization: options?.headers?.Authorization,
          'Content-Type': options?.headers?.ContentType || 'application/json',
        },
        params: options?.params,
      })
      return { data, statusCode: status }
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response?.status) {
        return {
          data: error.response?.data,
          statusCode: error.response?.status,
        }
      }
      throw error
    }
  }

  async get<T = unknown>(
    url: string,
    options?: HttpClientOptions | undefined,
  ): Promise<HttpClientResponse<T>> {
    try {
      const { data, status } = await axios.get(url, {
        headers: {
          Authorization: options?.headers?.Authorization,
          'Content-Type': options?.headers?.ContentType || 'application/json',
        },
        params: options?.params,
        data: options?.body,
      })
      return { data, statusCode: status }
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response?.status) {
        return {
          data: error.response?.data,
          statusCode: error.response?.status,
        }
      }
      throw error
    }
  }
}
