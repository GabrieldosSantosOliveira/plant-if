import {
  HttpService,
  HttpServiceOptions,
  HttpServiceResponse,
} from '@/interfaces/http/http-service'
import axios from 'axios'

export class HttpServiceImpl implements HttpService {
  async get<T = any>(
    url: string,
    options?: HttpServiceOptions | undefined,
  ): Promise<HttpServiceResponse<T>> {
    const { data, status } = await axios.get(url, {
      headers: {
        Authorization: options?.headers?.Authorization,
      },
      params: options?.params,
    })
    return { data, statusCode: status }
  }
}
