import { ForgotPasswordUseCaseImpl } from '@/data/use-cases/auth/forgot-password-use-case-impl';
import { UnexpectedException } from '@/domain/use-cases/errors/unexpected-exception';
import { left, right } from '@/shared/either';
import { faker } from '@faker-js/faker';

import {
  makeForgotPasswordRepositoryMock,
  makeForgotPasswordRepositoryMockWithError,
  makeForgotPasswordRepositoryMockWithException,
} from '../mocks/use-cases/auth/make-forgot-password-repository-mock';

const makeSut = () => {
  const { forgotPasswordRepositoryMock } = makeForgotPasswordRepositoryMock();
  const sut = new ForgotPasswordUseCaseImpl(forgotPasswordRepositoryMock);
  return { sut, forgotPasswordRepositoryMock };
};
const makeSutWithError = () => {
  const { forgotPasswordRepositoryMockWithError } =
    makeForgotPasswordRepositoryMockWithError();
  const sut = new ForgotPasswordUseCaseImpl(
    forgotPasswordRepositoryMockWithError,
  );
  return { sut, forgotPasswordRepositoryMockWithError };
};
const makeSutWithException = () => {
  const { forgotPasswordRepositoryMockWithException } =
    makeForgotPasswordRepositoryMockWithException();
  const sut = new ForgotPasswordUseCaseImpl(
    forgotPasswordRepositoryMockWithException,
  );
  return { sut, forgotPasswordRepositoryMockWithException };
};
const email = faker.internet.email();
describe('ForgotPasswordUseCaseImpl', () => {
  it('should return null if success', async () => {
    const { sut } = makeSut();
    const response = await sut.execute({ email });
    expect(response).toEqual(right(null));
  });
  it('should call ForgotPasswordRepository with correct params', async () => {
    const { sut, forgotPasswordRepositoryMock } = makeSut();
    const forgotPasswordRepositorySpy = jest.spyOn(
      forgotPasswordRepositoryMock,
      'execute',
    );
    await sut.execute({ email });
    expect(forgotPasswordRepositorySpy).toHaveBeenCalledWith({ email });
  });
  it('should throw if ForgotPasswordRepository throw', async () => {
    const { sut } = makeSutWithError();
    await expect(sut.execute({ email })).rejects.toThrow();
  });
  it('should return exception if ForgotPasswordRepository return exception', async () => {
    const { sut } = makeSutWithException();
    const exception = await sut.execute({ email });
    expect(exception).toEqual(left(new UnexpectedException()));
  });
});
