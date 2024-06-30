import { UserAlreadyExistsException } from "../../../../src/domain/use-cases/errors/user-already-exists-exception";
import { CreateUserWithEmailUseCase } from "../../../../src/domain/use-cases/user/create-user-with-email-use-case";
import { makeUser } from "../../../domain/factories/make-user";

export class CreateUserWithEmailUseCaseMock
  implements CreateUserWithEmailUseCase
{
  async handle(): Promise<CreateUserWithEmailUseCase.Response> {
    return {
      accessToken: "any_access_token",
      refreshToken: "any_refresh_token",
      user: makeUser(),
    };
  }
}
export const makeCreateUserWithEmailUseCaseMock = () => {
  const createUserWithEmailUseCaseMock = new CreateUserWithEmailUseCaseMock();
  return { createUserWithEmailUseCaseMock };
};

export class CreateUserWithEmailUseCaseMockWithError
  implements CreateUserWithEmailUseCase
{
  async handle(): Promise<CreateUserWithEmailUseCase.Response> {
    throw new Error();
  }
}
export const makeCreateUserWithEmailUseCaseMockWithError = () => {
  const createUserWithEmailUseCaseMockWithError =
    new CreateUserWithEmailUseCaseMockWithError();
  return { createUserWithEmailUseCaseMockWithError };
};
export class CreateUserWithEmailUseCaseMockWithException
  implements CreateUserWithEmailUseCase
{
  async handle(): Promise<CreateUserWithEmailUseCase.Response> {
    throw new UserAlreadyExistsException();
  }
}
export const makeCreateUserWithEmailUseCaseMockWithException = () => {
  const createUserWithEmailUseCaseMockWithException =
    new CreateUserWithEmailUseCaseMockWithException();
  return { createUserWithEmailUseCaseMockWithException };
};
