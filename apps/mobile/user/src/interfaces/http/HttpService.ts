export interface HttpServiceResponse<T> {
  data: T
  statusCode: number
}
export interface HttpServiceOptions {
  body?: any
}
export interface HttpService {
  get<T = any>(url: string): Promise<HttpServiceResponse<T>>
  post<T = any>(
    url: string,
    options?: HttpServiceOptions,
  ): Promise<HttpServiceResponse<T>>
  put<T = any>(
    url: string,
    options?: HttpServiceOptions,
  ): Promise<HttpServiceResponse<T>>
  patch<T = any>(
    url: string,
    options?: HttpServiceOptions,
  ): Promise<HttpServiceResponse<T>>
  delete<T = any>(
    url: string,
    options?: HttpServiceOptions,
  ): Promise<HttpServiceResponse<T>>
}
