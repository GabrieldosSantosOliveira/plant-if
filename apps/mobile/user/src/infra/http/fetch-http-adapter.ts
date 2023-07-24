import {
  HttpClient,
  HttpClientOptions,
  HttpClientResponse,
} from '@/data/protocols/http/http-client'
import { Json } from '@/data/protocols/json/json'
import { JsonValidator } from '@/validation/protocols/json-validator'
enum HttpMethod {
  GET = 'GET',
  PATCH = 'PATCH',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
export class FetchHttpAdapter implements HttpClient {
  constructor(
    private readonly jsonValidator: JsonValidator,
    private readonly json: Json,
  ) {}

  async get<T = unknown>(
    url: string,
    options?: HttpClientOptions,
  ): Promise<HttpClientResponse<T>> {
    const response = await fetch(url, {
      method: HttpMethod.GET,
      body: await this.json.stringify(options?.body),
      headers: {
        ...options?.headers,
        'Content-Type':
          options?.headers?.['Content-Type'] || 'application/json',
      },
    })
    const text = await response.text()
    if (this.jsonValidator.isValidJSON(text)) {
      const data = await this.json.parse<T>(text)
      return { data, statusCode: response.status }
    }
    return { data: undefined as T, statusCode: response.status }
  }

  async post<T = unknown>(
    url: string,
    options?: HttpClientOptions | undefined,
  ): Promise<HttpClientResponse<T>> {
    const response = await fetch(url, {
      method: HttpMethod.POST,
      body: await this.json.stringify(options?.body),
      headers: {
        ...options?.headers,
        'Content-Type':
          options?.headers?.['Content-Type'] || 'application/json',
      },
    })
    const text = await response.text()
    if (this.jsonValidator.isValidJSON(text)) {
      const data = await this.json.parse<T>(text)
      return { data, statusCode: response.status }
    }
    return { data: undefined as T, statusCode: response.status }
  }

  async put<T = unknown>(
    url: string,
    options?: HttpClientOptions | undefined,
  ): Promise<HttpClientResponse<T>> {
    const response = await fetch(url, {
      method: HttpMethod.PUT,
      body: await this.json.stringify(options?.body),
      headers: {
        ...options?.headers,
        'Content-Type':
          options?.headers?.['Content-Type'] || 'application/json',
      },
    })
    const text = await response.text()
    if (this.jsonValidator.isValidJSON(text)) {
      const data = await this.json.parse<T>(text)
      return { data, statusCode: response.status }
    }
    return { data: undefined as T, statusCode: response.status }
  }

  async patch<T = unknown>(
    url: string,
    options?: HttpClientOptions | undefined,
  ): Promise<HttpClientResponse<T>> {
    const response = await fetch(url, {
      method: HttpMethod.PATCH,
      body: await this.json.stringify(options?.body),
      headers: {
        ...options?.headers,
        'Content-Type':
          options?.headers?.['Content-Type'] || 'application/json',
      },
    })
    const text = await response.text()
    if (this.jsonValidator.isValidJSON(text)) {
      const data = await this.json.parse<T>(text)
      return { data, statusCode: response.status }
    }
    return { data: undefined as T, statusCode: response.status }
  }

  async delete<T = unknown>(
    url: string,
    options?: HttpClientOptions | undefined,
  ): Promise<HttpClientResponse<T>> {
    const response = await fetch(url, {
      method: HttpMethod.DELETE,
      body: await this.json.stringify(options?.body),
      headers: {
        ...options?.headers,
        'Content-Type':
          options?.headers?.['Content-Type'] || 'application/json',
      },
    })
    const text = await response.text()
    if (this.jsonValidator.isValidJSON(text)) {
      const data = await this.json.parse<T>(text)
      return { data, statusCode: response.status }
    }
    return { data: undefined as T, statusCode: response.status }
  }
}
