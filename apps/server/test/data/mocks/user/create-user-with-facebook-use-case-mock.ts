import { UnauthorizedException } from "../../../../src/domain/use-cases/errors/unauthorized-exception";
import { CreateUserWithFacebookUseCase } from "../../../../src/domain/use-cases/user/create-user-with-facebook-use-case";
import { makeUser } from "../../../domain/factories/make-user";

export class CreateUserWithFacebookUseCaseMock
  implements CreateUserWithFacebookUseCase
{
  public request: CreateUserWithFacebookUseCase.Params;
  public response: CreateUserWithFacebookUseCase.Response;
  async handle(
    request: CreateUserWithFacebookUseCase.Params,
  ): Promise<CreateUserWithFacebookUseCase.Response> {
    this.request = request;
    this.response = {
      accessToken: "any_access_token",
      refreshToken: "any_refresh_token",
      user: makeUser(),
    };
    return this.response;
  }
}
export const makeCreateUserWithFacebookUseCaseMock = () => {
  const createUserWithFacebookUseCaseMock =
    new CreateUserWithFacebookUseCaseMock();
  return { createUserWithFacebookUseCaseMock };
};
export class CreateUserWithFacebookUseCaseMockWithError
  implements CreateUserWithFacebookUseCase
{
  async handle(): Promise<CreateUserWithFacebookUseCase.Response> {
    throw new Error();
  }
}
export const makeCreateUserWithFacebookUseCaseMockWithError = () => {
  const createUserWithFacebookUseCaseMockWithError =
    new CreateUserWithFacebookUseCaseMockWithError();
  return { createUserWithFacebookUseCaseMockWithError };
};
export class CreateUserWithFacebookUseCaseMockWithException
  implements CreateUserWithFacebookUseCase
{
  async handle(): Promise<CreateUserWithFacebookUseCase.Response> {
    throw new UnauthorizedException();
  }
}
export const makeCreateUserWithFacebookUseCaseMockWithException = () => {
  const createUserWithFacebookUseCaseMockWithException =
    new CreateUserWithFacebookUseCaseMockWithException();
  return { createUserWithFacebookUseCaseMockWithException };
};
