import { Controller } from '@/interfaces/controller/controller'
import { HttpRequest } from '@/interfaces/http/http-request'
import { Request, Response } from 'express'

export const makeExpressRouterAdapter = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    const httpRequest: HttpRequest = {
      body: request.body,
      params: request.params,
      query: request.query,
    }
    const httpResponse = await controller.handle(httpRequest)
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
