export interface HttpClientResponse<T> {
  statusCode: number
  data: T
}
export interface HttpClientOptionsHeaders {
  Authorization: string
}
export interface HttpClientOptions {
  headers?: HttpClientOptionsHeaders
  params?: object
}

export interface HttpClient {
  get<T = unknown>(
    url: string,
    options?: HttpClientOptions,
  ): Promise<HttpClientResponse<T>>
}
