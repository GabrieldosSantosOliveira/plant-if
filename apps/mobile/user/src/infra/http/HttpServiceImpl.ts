import {
  HttpService,
  HttpServiceOptions,
  HttpServiceResponse,
} from '@/interfaces/http/HttpService'
function isJSON(text: string) {
  try {
    JSON.parse(text)
    return true
  } catch {
    return false
  }
}
export class HttpServiceImpl implements HttpService {
  async get<T = unknown>(url: string): Promise<HttpServiceResponse<T>> {
    const response = await fetch(url)
    const text = await response.text()

    if (isJSON(text)) {
      const data = await response.json()
      return { data, statusCode: response.status }
    }
    return { data: undefined as T, statusCode: response.status }
  }

  async post<T = unknown>(
    url: string,
    options?: HttpServiceOptions | undefined,
  ): Promise<HttpServiceResponse<T>> {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(options),
    })
    const text = await response.text()
    if (isJSON(text)) {
      const data = await response.json()
      return { data, statusCode: response.status }
    }
    return { data: undefined as T, statusCode: response.status }
  }

  async put<T = unknown>(
    url: string,
    options?: HttpServiceOptions | undefined,
  ): Promise<HttpServiceResponse<T>> {
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(options?.body),
    })
    const text = await response.text()
    if (isJSON(text)) {
      const data = await response.json()
      return { data, statusCode: response.status }
    }
    return { data: undefined as T, statusCode: response.status }
  }

  async patch<T = unknown>(
    url: string,
    options?: HttpServiceOptions | undefined,
  ): Promise<HttpServiceResponse<T>> {
    const response = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(options?.body),
    })
    const text = await response.text()
    if (isJSON(text)) {
      const data = await response.json()
      return { data, statusCode: response.status }
    }
    return { data: undefined as T, statusCode: response.status }
  }

  async delete<T = unknown>(
    url: string,
    options?: HttpServiceOptions | undefined,
  ): Promise<HttpServiceResponse<T>> {
    const response = await fetch(url, {
      method: 'DELETE',
      body: JSON.stringify(options?.body),
    })
    const text = await response.text()
    if (isJSON(text)) {
      const data = await response.json()
      return { data, statusCode: response.status }
    }
    return { data: undefined as T, statusCode: response.status }
  }
}
