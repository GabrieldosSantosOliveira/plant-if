import { keys } from '@/constants/keys';
import { SingUpWithEmailUseCaseImpl } from '@/data/use-cases/auth/sing-up-with-email-use-case-impl';
import { UnexpectedException } from '@/domain/use-cases/errors/unexpected-exception';
import { SingUpWithEmailUseCaseDto } from '@/domain/use-cases/sing-up-with-email-use-case';
import { left, right } from '@/shared/either';
import { makeSecureStorageMock } from '@/test/infra/mocks/storage/make-secure-storage-mock';
import { faker } from '@faker-js/faker';

import {
  makeSingUpWithEmailRepositoryMock,
  makeSingUpWithEmailRepositoryMockWithError,
  makeSingUpWithEmailRepositoryMockWithException,
} from '../mocks/use-cases/auth/make-sing-up-with-email-repository-mock';

const makeSut = () => {
  const { secureStorageMock } = makeSecureStorageMock();
  const { singUpWithEmailRepositoryMock } = makeSingUpWithEmailRepositoryMock();
  const sut = new SingUpWithEmailUseCaseImpl(
    singUpWithEmailRepositoryMock,
    secureStorageMock,
  );
  return { sut, secureStorageMock, singUpWithEmailRepositoryMock };
};

const makeSutWithError = () => {
  const { secureStorageMock } = makeSecureStorageMock();
  const { singUpWithEmailRepositoryMockWithError } =
    makeSingUpWithEmailRepositoryMockWithError();
  const sut = new SingUpWithEmailUseCaseImpl(
    singUpWithEmailRepositoryMockWithError,
    secureStorageMock,
  );
  return { sut, secureStorageMock, singUpWithEmailRepositoryMockWithError };
};
const makeSutWithException = () => {
  const { secureStorageMock } = makeSecureStorageMock();
  const { singUpWithEmailRepositoryMockWithException } =
    makeSingUpWithEmailRepositoryMockWithException();
  const sut = new SingUpWithEmailUseCaseImpl(
    singUpWithEmailRepositoryMockWithException,
    secureStorageMock,
  );
  return { sut, secureStorageMock, singUpWithEmailRepositoryMockWithException };
};
const makeRequest = (): SingUpWithEmailUseCaseDto => {
  return {
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    password: faker.internet.password(),
  };
};
describe('SingUpWithEmailUseCaseImpl', () => {
  it('should return user ui model if success', async () => {
    const { sut, singUpWithEmailRepositoryMock } = makeSut();
    const user = await sut.execute(makeRequest());
    expect(user).toEqual(right(singUpWithEmailRepositoryMock.user));
  });
  it('should save accessToken if success', async () => {
    const { sut, singUpWithEmailRepositoryMock, secureStorageMock } = makeSut();
    await sut.execute(makeRequest());
    const accessToken = await secureStorageMock.getItem(keys.ACCESS_TOKEN);
    expect(accessToken).toEqual(singUpWithEmailRepositoryMock.accessToken);
  });
  it('should call SingUpWithEmailRepository with correct params', async () => {
    const { sut, singUpWithEmailRepositoryMock } = makeSut();
    const singUpWithEmailRepositorySpy = jest.spyOn(
      singUpWithEmailRepositoryMock,
      'execute',
    );
    const request = makeRequest();
    await sut.execute(request);
    expect(singUpWithEmailRepositorySpy).toHaveBeenCalledWith({
      email: request.email,
      firstName: request.firstName,
      lastName: request.lastName,
      password: request.password,
    });
  });
  it('should save refreshToken if success', async () => {
    const { sut, singUpWithEmailRepositoryMock, secureStorageMock } = makeSut();
    await sut.execute(makeRequest());
    const refreshToken = await secureStorageMock.getItem(keys.REFRESH_TOKEN);
    expect(refreshToken).toEqual(singUpWithEmailRepositoryMock.refreshToken);
  });
  it('should throw if SingUpWithEmailRepository throw', async () => {
    const { sut } = makeSutWithError();
    await expect(sut.execute(makeRequest())).rejects.toThrow();
  });
  it('should return exception if SingUpWithEmailRepository return exception', async () => {
    const { sut } = makeSutWithException();
    const exception = await sut.execute(makeRequest());
    expect(exception).toEqual(left(new UnexpectedException()));
  });
});
