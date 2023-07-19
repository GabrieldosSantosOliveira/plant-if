import {
  HttpClient,
  HttpClientOptions,
  HttpClientResponse,
} from '@/interfaces/http/http-client'
import axios from 'axios'

export class HttpClientImpl implements HttpClient {
  async get<T = unknown>(
    url: string,
    options?: HttpClientOptions | undefined,
  ): Promise<HttpClientResponse<T>> {
    const { data, status } = await axios.get(url, {
      headers: {
        Authorization: options?.headers?.Authorization,
      },
      params: options?.params,
    })
    return { data, statusCode: status }
  }
}
