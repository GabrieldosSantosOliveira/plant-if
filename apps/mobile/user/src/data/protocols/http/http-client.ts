export interface HttpClientResponse<T> {
  data: T;
  statusCode: number;
}
export interface HttpClientOptions {
  body?: unknown;
  headers?: HttpClientOptionsHeaders;
}
export interface HttpClientOptionsHeaders {
  [key: string]: string;
  'Content-Type': string;
}
export interface HttpClient {
  get<T = unknown>(
    url: string,
    options?: HttpClientOptions,
  ): Promise<HttpClientResponse<T>>;
  post<T = unknown>(
    url: string,
    options?: HttpClientOptions,
  ): Promise<HttpClientResponse<T>>;
  put<T = unknown>(
    url: string,
    options?: HttpClientOptions,
  ): Promise<HttpClientResponse<T>>;
  patch<T = unknown>(
    url: string,
    options?: HttpClientOptions,
  ): Promise<HttpClientResponse<T>>;
  delete<T = unknown>(
    url: string,
    options?: HttpClientOptions,
  ): Promise<HttpClientResponse<T>>;
}
