import { keys } from '@/constants/keys';
import { AuthWithGoogleUseCaseImpl } from '@/data/use-cases/auth/auth-with-google-use-case-impl';
import { UnexpectedException } from '@/domain/use-cases/errors/unexpected-exception';
import { left, right } from '@/shared/either';
import {
  makeAuthWithGoogleRepositoryMock,
  makeAuthWithGoogleRepositoryMockWithError,
  makeAuthWithGoogleRepositoryMockWithException,
} from '@/test/infra/mocks/data-source/repositories/auth/make-auth-with-google-repository-mock';
import { makeSecureStorageMock } from '@/test/infra/mocks/storage/make-secure-storage-mock';
import { faker } from '@faker-js/faker';

const makeSut = () => {
  const { secureStorageMock } = makeSecureStorageMock();
  const { authWithGoogleRepositoryMock } = makeAuthWithGoogleRepositoryMock();
  const sut = new AuthWithGoogleUseCaseImpl(
    secureStorageMock,
    authWithGoogleRepositoryMock,
  );
  return { sut, secureStorageMock, authWithGoogleRepositoryMock };
};
const makeSutWithError = () => {
  const { secureStorageMock } = makeSecureStorageMock();
  const { authWithGoogleRepositoryMockWithError } =
    makeAuthWithGoogleRepositoryMockWithError();
  const sut = new AuthWithGoogleUseCaseImpl(
    secureStorageMock,
    authWithGoogleRepositoryMockWithError,
  );
  return { sut, secureStorageMock, authWithGoogleRepositoryMockWithError };
};
const makeSutWithException = () => {
  const { secureStorageMock } = makeSecureStorageMock();
  const { authWithGoogleRepositoryMockWithException } =
    makeAuthWithGoogleRepositoryMockWithException();
  const sut = new AuthWithGoogleUseCaseImpl(
    secureStorageMock,
    authWithGoogleRepositoryMockWithException,
  );
  return { sut, secureStorageMock, authWithGoogleRepositoryMockWithException };
};
const ACCESS_TOKEN = faker.lorem.words();
describe('AuthWithGoogleUseCaseImpl', () => {
  it('should return user if success', async () => {
    const { sut, authWithGoogleRepositoryMock } = makeSut();
    const user = await sut.execute(ACCESS_TOKEN);
    expect(user).toEqual(right(authWithGoogleRepositoryMock.user));
  });
  it('should save accessToken if success', async () => {
    const { sut, authWithGoogleRepositoryMock, secureStorageMock } = makeSut();
    await sut.execute(ACCESS_TOKEN);
    const accessToken = await secureStorageMock.getItem(keys.ACCESS_TOKEN);
    expect(accessToken).toEqual(authWithGoogleRepositoryMock.accessToken);
    expect(accessToken).toBeTruthy();
  });
  it('should save refreshToken if success', async () => {
    const { sut, authWithGoogleRepositoryMock, secureStorageMock } = makeSut();
    await sut.execute(ACCESS_TOKEN);
    const refreshToken = await secureStorageMock.getItem(keys.REFRESH_TOKEN);
    expect(refreshToken).toEqual(authWithGoogleRepositoryMock.refreshToken);
    expect(refreshToken).toBeTruthy();
  });
  it('should throw if AuthWithGoogleRepository throw', async () => {
    const { sut } = makeSutWithError();
    await expect(sut.execute(ACCESS_TOKEN)).rejects.toThrow();
  });
  it('should return exception if AuthWithGoogleRepository return exception', async () => {
    const { sut } = makeSutWithException();
    const exception = await sut.execute(ACCESS_TOKEN);
    expect(exception).toEqual(left(new UnexpectedException()));
  });
});
