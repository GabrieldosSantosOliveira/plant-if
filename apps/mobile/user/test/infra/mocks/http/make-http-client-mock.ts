/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HttpClient,
  HttpClientResponse,
} from '@/data/protocols/http/http-client'

export class HttpClientMock implements HttpClient {
  public responseGet!: HttpClientResponse<any>
  public responsePost!: HttpClientResponse<any>
  public responsePut!: HttpClientResponse<any>
  public responsePatch!: HttpClientResponse<any>
  public responseDelete!: HttpClientResponse<any>

  async get<T = unknown>(): Promise<HttpClientResponse<T>> {
    return this.responseGet
  }

  async post<T = unknown>(): Promise<HttpClientResponse<T>> {
    return this.responsePost
  }

  async put<T = unknown>(): Promise<HttpClientResponse<T>> {
    return this.responsePut
  }

  async patch<T = unknown>(): Promise<HttpClientResponse<T>> {
    return this.responsePatch
  }

  async delete<T = unknown>(): Promise<HttpClientResponse<T>> {
    return this.responseDelete
  }
}
export const makeHttpClientMock = () => {
  const httpClientMock = new HttpClientMock()
  return { httpClientMock }
}
export class HttpClientMockWithError implements HttpClient {
  async get<T = unknown>(): Promise<HttpClientResponse<T>> {
    throw new Error()
  }

  async post<T = unknown>(): Promise<HttpClientResponse<T>> {
    throw new Error()
  }

  async put<T = unknown>(): Promise<HttpClientResponse<T>> {
    throw new Error()
  }

  async patch<T = unknown>(): Promise<HttpClientResponse<T>> {
    throw new Error()
  }

  async delete<T = unknown>(): Promise<HttpClientResponse<T>> {
    throw new Error()
  }
}
export const makeHttpClientMockWithError = () => {
  const httpClientMockWithError = new HttpClientMockWithError()
  return { httpClientMockWithError }
}
