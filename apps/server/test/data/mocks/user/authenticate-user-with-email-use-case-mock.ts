import { UserNotFoundException } from "../../../../src/domain/use-cases/errors/user-not-found-exception";
import { AuthenticateUserWithEmailUseCase } from "../../../../src/domain/use-cases/user/authenticate-user-with-email-use-case";
import { makeUser } from "../../../domain/factories/make-user";

export class AuthenticateUserWithEmailUseCaseMock
  implements AuthenticateUserWithEmailUseCase
{
  async handle(): Promise<AuthenticateUserWithEmailUseCase.Response> {
    return {
      accessToken: "any_access_token",
      refreshToken: "any_refresh_token",
      user: makeUser(),
    };
  }
}
export const makeAuthenticateUserWithEmailUseCaseMock = () => {
  const authenticateUserWithEmailUseCaseMock =
    new AuthenticateUserWithEmailUseCaseMock();
  return { authenticateUserWithEmailUseCaseMock };
};

export class AuthenticateUserWithEmailUseCaseMockWithError
  implements AuthenticateUserWithEmailUseCase
{
  handle(): Promise<AuthenticateUserWithEmailUseCase.Response> {
    throw new Error();
  }
}
export const makeAuthenticateUserWithEmailUseCaseMockWithError = () => {
  const authenticateUserWithEmailUseCaseMockWithError =
    new AuthenticateUserWithEmailUseCaseMockWithError();
  return { authenticateUserWithEmailUseCaseMockWithError };
};
export class AuthenticateUserWithEmailUseCaseMockWithException
  implements AuthenticateUserWithEmailUseCase
{
  async handle(): Promise<AuthenticateUserWithEmailUseCase.Response> {
    throw new UserNotFoundException();
  }
}
export const makeAuthenticateUserWithEmailUseCaseMockWithException = () => {
  const authenticateUserWithEmailUseCaseWithException =
    new AuthenticateUserWithEmailUseCaseMockWithException();
  return { authenticateUserWithEmailUseCaseWithException };
};
