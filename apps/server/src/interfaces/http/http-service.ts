export interface HttpServiceResponse<T> {
  statusCode: number
  data: T
}
export interface HttpServiceOptionsHeaders {
  Authorization: string
}
export interface HttpServiceOptions {
  headers?: HttpServiceOptionsHeaders
}

export interface HttpService {
  get<T = any>(
    url: string,
    options?: HttpServiceOptions,
  ): Promise<HttpServiceResponse<T>>
}
