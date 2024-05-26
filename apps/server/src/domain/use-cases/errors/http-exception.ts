import { Exception } from "./exception";

export class HttpException extends Error implements Exception {
  private _statusCode: number;
  private _code?: number;
  private _description?: string;
  constructor({ message, statusCode, code, description }: Exception) {
    super(message);
    this._statusCode = statusCode;
    this._code = code;
    this._description = description;
    this.name = "HttpException";
  }

  public get statusCode() {
    return this._statusCode;
  }

  public get code() {
    return this._code;
  }

  public get description() {
    return this._description;
  }
}
