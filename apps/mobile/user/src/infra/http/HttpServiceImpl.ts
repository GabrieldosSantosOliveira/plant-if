import {
  HttpService,
  HttpServiceOptions,
  HttpServiceResponse,
} from '@/interfaces/http/HttpService'
import axios, { isAxiosError } from 'axios'

export class HttpServiceImpl implements HttpService {
  async get<T = unknown>(url: string): Promise<HttpServiceResponse<T>> {
    const { data, status } = await axios.get(url)
    return { data, statusCode: status }
  }

  async post<T = unknown>(
    url: string,
    options?: HttpServiceOptions | undefined,
  ): Promise<HttpServiceResponse<T>> {
    try {
      const { data, status } = await axios.post(url, options?.body)
      return { data, statusCode: status }
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          data: error.response?.data,
          statusCode: error.response?.status || 500,
        }
      }
      throw new Error()
    }
  }

  async put<T = unknown>(
    url: string,
    options?: HttpServiceOptions | undefined,
  ): Promise<HttpServiceResponse<T>> {
    const { data, status } = await axios.put(url, options?.body)
    return { data, statusCode: status }
  }

  async patch<T = unknown>(
    url: string,
    options?: HttpServiceOptions | undefined,
  ): Promise<HttpServiceResponse<T>> {
    const { data, status } = await axios.patch(url, options?.body)
    return { data, statusCode: status }
  }

  async delete<T = unknown>(
    url: string,
    options?: HttpServiceOptions | undefined,
  ): Promise<HttpServiceResponse<T>> {
    const { data, status } = await axios.delete(url, { data: options?.body })
    return { data, statusCode: status }
  }
}
