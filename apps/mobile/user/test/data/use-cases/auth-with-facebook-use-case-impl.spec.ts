import { keys } from '@/constants/keys';
import { AuthWithFacebookUseCaseImpl } from '@/data/use-cases/auth/auth-with-facebook-use-case-impl';
import { UnexpectedException } from '@/domain/use-cases/errors/unexpected-exception';
import { left, right } from '@/shared/either';
import {
  makeAuthWithFacebookRepositoryMock,
  makeAuthWithFacebookRepositoryMockWithError,
  makeAuthWithFacebookRepositoryMockWithException,
} from '@/test/infra/mocks/data-source/repositories/auth/make-auth-with-facebook-repository-mock';
import { makeSecureStorageMock } from '@/test/infra/mocks/storage/make-secure-storage-mock';
import { faker } from '@faker-js/faker';

const makeSut = () => {
  const { secureStorageMock } = makeSecureStorageMock();
  const { authWithFacebookRepositoryMock } =
    makeAuthWithFacebookRepositoryMock();
  const sut = new AuthWithFacebookUseCaseImpl(
    authWithFacebookRepositoryMock,
    secureStorageMock,
  );
  return { sut, secureStorageMock, authWithFacebookRepositoryMock };
};
const makeSutWithError = () => {
  const { secureStorageMock } = makeSecureStorageMock();
  const { authWithFacebookRepositoryMockWithError } =
    makeAuthWithFacebookRepositoryMockWithError();
  const sut = new AuthWithFacebookUseCaseImpl(
    authWithFacebookRepositoryMockWithError,
    secureStorageMock,
  );
  return { sut, secureStorageMock, authWithFacebookRepositoryMockWithError };
};
const makeSutWithException = () => {
  const { secureStorageMock } = makeSecureStorageMock();
  const { authWithFacebookRepositoryMockWithException } =
    makeAuthWithFacebookRepositoryMockWithException();
  const sut = new AuthWithFacebookUseCaseImpl(
    authWithFacebookRepositoryMockWithException,
    secureStorageMock,
  );
  return {
    sut,
    secureStorageMock,
    authWithFacebookRepositoryMockWithException,
  };
};
const ACCESS_TOKEN = faker.lorem.words();
describe('AuthWithFacebookUseCaseImpl', () => {
  it('should return user ui model if success', async () => {
    const { sut, authWithFacebookRepositoryMock } = makeSut();
    const user = await sut.execute(ACCESS_TOKEN);
    expect(user).toEqual(right(authWithFacebookRepositoryMock.user));
  });
  it('should save accessToken if success', async () => {
    const { sut, secureStorageMock, authWithFacebookRepositoryMock } =
      makeSut();
    await sut.execute(ACCESS_TOKEN);
    const accessToken = await secureStorageMock.getItem(keys.ACCESS_TOKEN);
    expect(accessToken).toBe(authWithFacebookRepositoryMock.accessToken);
    expect(accessToken).toBeTruthy();
  });
  it('should save refreshToken if success', async () => {
    const { sut, secureStorageMock, authWithFacebookRepositoryMock } =
      makeSut();
    await sut.execute(ACCESS_TOKEN);
    const refreshToken = await secureStorageMock.getItem(keys.REFRESH_TOKEN);
    expect(refreshToken).toBe(authWithFacebookRepositoryMock.refreshToken);
    expect(refreshToken).toBeTruthy();
  });
  it('should throw if AuthWithFacebookRepository throw', async () => {
    const { sut } = makeSutWithError();
    await expect(sut.execute(ACCESS_TOKEN)).rejects.toThrow();
  });
  it('should return exception if AuthWithFacebookRepository return exception', async () => {
    const { sut } = makeSutWithException();
    const user = await sut.execute(ACCESS_TOKEN);
    expect(user).toEqual(left(new UnexpectedException()));
  });
});
