import {
  AuthWithFacebookRepository,
  AuthWithFacebookRepositoryResponse,
} from '@/domain/repositories/auth-with-facebook-repository';
import { Exception } from '@/domain/use-cases/errors/exception';
import { UnexpectedException } from '@/domain/use-cases/errors/unexpected-exception';
import { UserMapper } from '@/infra/data-source/mappers/user-mapper';
import { Either, left, right } from '@/shared/either';
import { faker } from '@faker-js/faker';

import { makeUserDto } from '../../dtos/make-user-dto';

export class AuthWithFacebookRepositoryMock
  implements AuthWithFacebookRepository
{
  public accessToken = faker.lorem.words();
  public refreshToken = faker.lorem.words();
  public user = UserMapper.toUI(makeUserDto());
  async execute(): Promise<
    Either<Exception, AuthWithFacebookRepositoryResponse>
  > {
    return right({
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
      user: this.user,
    });
  }
}
export const makeAuthWithFacebookRepositoryMock = () => {
  const authWithFacebookRepositoryMock = new AuthWithFacebookRepositoryMock();
  return { authWithFacebookRepositoryMock };
};
export class AuthWithFacebookRepositoryMockWithException
  implements AuthWithFacebookRepository
{
  async execute(): Promise<
    Either<Exception, AuthWithFacebookRepositoryResponse>
  > {
    return left(new UnexpectedException());
  }
}
export const makeAuthWithFacebookRepositoryMockWithException = () => {
  const authWithFacebookRepositoryMockWithException =
    new AuthWithFacebookRepositoryMockWithException();
  return { authWithFacebookRepositoryMockWithException };
};
export class AuthWithFacebookRepositoryMockWithError
  implements AuthWithFacebookRepository
{
  async execute(): Promise<
    Either<Exception, AuthWithFacebookRepositoryResponse>
  > {
    throw new Error();
  }
}
export const makeAuthWithFacebookRepositoryMockWithError = () => {
  const authWithFacebookRepositoryMockWithError =
    new AuthWithFacebookRepositoryMockWithError();
  return { authWithFacebookRepositoryMockWithError };
};
