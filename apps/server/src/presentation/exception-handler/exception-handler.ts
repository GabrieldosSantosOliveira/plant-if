import { HttpResponse } from "../protocols/http/http-response";

export interface ExceptionHandler {
  handle(error: unknown): Promise<HttpResponse | null>;
}
