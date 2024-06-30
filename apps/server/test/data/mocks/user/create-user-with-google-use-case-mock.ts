import { UnauthorizedException } from "../../../../src/domain/use-cases/errors/unauthorized-exception";
import { CreateUserWithGoogleUseCase } from "../../../../src/domain/use-cases/user/create-user-with-google-use-case";
import { makeUser } from "../../../domain/factories/make-user";

export class CreateUserWithGoogleUseCaseMock
  implements CreateUserWithGoogleUseCase
{
  public request: CreateUserWithGoogleUseCase.Params;
  public response: CreateUserWithGoogleUseCase.Response;
  async handle(
    request: CreateUserWithGoogleUseCase.Params,
  ): Promise<CreateUserWithGoogleUseCase.Response> {
    this.request = request;
    this.response = {
      accessToken: "any_access_token",
      refreshToken: "any_refresh_token",
      user: makeUser(),
    };
    return this.response;
  }
}
export const makeCreateUserWithGoogleUseCaseMock = () => {
  const createUserWithGoogleUseCaseMock = new CreateUserWithGoogleUseCaseMock();
  return { createUserWithGoogleUseCaseMock };
};
export class CreateUserWithGoogleUseCaseMockWithError
  implements CreateUserWithGoogleUseCase
{
  async handle(): Promise<CreateUserWithGoogleUseCase.Response> {
    throw new Error();
  }
}
export const makeCreateUserWithGoogleUseCaseMockWithError = () => {
  const createUserWithGoogleUseCaseMockWithError =
    new CreateUserWithGoogleUseCaseMockWithError();
  return { createUserWithGoogleUseCaseMockWithError };
};
export class CreateUserWithGoogleUseCaseMockWithException
  implements CreateUserWithGoogleUseCase
{
  async handle(): Promise<CreateUserWithGoogleUseCase.Response> {
    throw new UnauthorizedException();
  }
}
export const makeCreateUserWithGoogleUseCaseMockWithException = () => {
  const createUserWithGoogleUseCaseMockWithException =
    new CreateUserWithGoogleUseCaseMockWithException();
  return { createUserWithGoogleUseCaseMockWithException };
};
