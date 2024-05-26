import {
  AuthWithEmailRepository,
  AuthWithEmailRepositoryResponse,
} from '@/domain/repositories/auth-with-email-repository';
import { Exception } from '@/domain/use-cases/errors/exception';
import { UnexpectedException } from '@/domain/use-cases/errors/unexpected-exception';
import { UserMapper } from '@/infra/data-source/mappers/user-mapper';
import { Either, left, right } from '@/shared/either';
import { faker } from '@faker-js/faker';

import { makeUserDto } from '../../dtos/make-user-dto';

export class AuthWithEmailRepositoryMock implements AuthWithEmailRepository {
  public accessToken = faker.lorem.words();
  public refreshToken = faker.lorem.words();
  public user = UserMapper.toUI(makeUserDto());
  async execute(): Promise<Either<Exception, AuthWithEmailRepositoryResponse>> {
    return right({
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
      user: this.user,
    });
  }
}
export const makeAuthWithEmailRepositoryMock = () => {
  const authWithEmailRepositoryMock = new AuthWithEmailRepositoryMock();
  return { authWithEmailRepositoryMock };
};
export class AuthWithEmailRepositoryMockWithException
  implements AuthWithEmailRepository
{
  async execute(): Promise<Either<Exception, AuthWithEmailRepositoryResponse>> {
    return left(new UnexpectedException());
  }
}
export const makeAuthWithEmailRepositoryMockWithException = () => {
  const authWithEmailRepositoryMockWithException =
    new AuthWithEmailRepositoryMockWithException();
  return { authWithEmailRepositoryMockWithException };
};
export class AuthWithEmailRepositoryMockWithError
  implements AuthWithEmailRepository
{
  async execute(): Promise<Either<Exception, AuthWithEmailRepositoryResponse>> {
    throw new Error();
  }
}
export const makeAuthWithEmailRepositoryMockWithError = () => {
  const authWithEmailRepositoryMockWithError =
    new AuthWithEmailRepositoryMockWithError();
  return { authWithEmailRepositoryMockWithError };
};
