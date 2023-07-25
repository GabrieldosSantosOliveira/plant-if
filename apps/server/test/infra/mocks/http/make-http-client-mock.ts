/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HttpClient,
  HttpClientResponse,
} from '@/data/protocols/http/http-client'

export class HttpClientMock implements HttpClient {
  public responseGet: HttpClientResponse<any>
  public responsePost: HttpClientResponse<any>

  async get<T = unknown>(): Promise<HttpClientResponse<T>> {
    return this.responseGet
  }

  async post<T = unknown>(): Promise<HttpClientResponse<T>> {
    return this.responsePost
  }
}
export const makeHttpClientMock = () => {
  const httpClientMock = new HttpClientMock()
  return { httpClientMock }
}
