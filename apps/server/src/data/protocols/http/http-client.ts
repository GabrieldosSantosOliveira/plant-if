export interface HttpClientResponse<T> {
  statusCode: number
  data: T
}
export interface HttpClientOptionsHeaders {
  Authorization?: string
  ContentType?: string
}
export interface HttpClientOptions {
  headers?: HttpClientOptionsHeaders
  params?: object
  body?: unknown
}

export interface HttpClient {
  get<T = unknown>(
    url: string,
    options?: HttpClientOptions,
  ): Promise<HttpClientResponse<T>>
  post<T = unknown>(
    url: string,
    options?: HttpClientOptions,
  ): Promise<HttpClientResponse<T>>
}
