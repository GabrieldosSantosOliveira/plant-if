export interface HttpServiceResponse<T> {
  data: T
  statusCode: number
}
export interface HttpServiceOptions {
  body?: unknown
}
export interface HttpService {
  get<T = unknown>(url: string): Promise<HttpServiceResponse<T>>
  post<T = unknown>(
    url: string,
    options?: HttpServiceOptions,
  ): Promise<HttpServiceResponse<T>>
  put<T = unknown>(
    url: string,
    options?: HttpServiceOptions,
  ): Promise<HttpServiceResponse<T>>
  patch<T = unknown>(
    url: string,
    options?: HttpServiceOptions,
  ): Promise<HttpServiceResponse<T>>
  delete<T = unknown>(
    url: string,
    options?: HttpServiceOptions,
  ): Promise<HttpServiceResponse<T>>
}
