import { HttpStatusCode } from '@/helpers/http/http-status-code'

export class HttpException extends Error {
  constructor(
    private readonly _statusCode: HttpStatusCode,
    private readonly _error: Error,
  ) {
    super()
    this.name = 'HttpException'
    this._error = _error
  }

  public get statusCode() {
    return this._statusCode
  }

  public get error() {
    return this._error
  }
}
