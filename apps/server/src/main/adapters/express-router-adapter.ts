import { Request, Response } from "express";
import { Controller } from "../../presentation/protocols/controller/controller";
import { HttpRequest } from "../../presentation/protocols/http/http-request";

export const makeExpressRouterAdapter = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    const httpRequest: HttpRequest = {
      body: request.body,
      params: request.params,
      query: request.query,
    };

    const httpResponse = await controller.handle(httpRequest);
    response.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
