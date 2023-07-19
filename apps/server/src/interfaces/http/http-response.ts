import { HttpStatusCode } from '../../helpers/http/http-status-code'

export interface HttpResponse {
  statusCode: HttpStatusCode
  body: unknown
}
