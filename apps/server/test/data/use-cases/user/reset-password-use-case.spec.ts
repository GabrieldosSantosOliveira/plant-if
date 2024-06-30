import { ResetPasswordUseCaseImpl } from "../../../../src/data/use-cases/user/reset-password-use-case-impl";
import { UnauthorizedException } from "../../../../src/domain/use-cases/errors/unauthorized-exception";
import { UserNotFoundException } from "../../../../src/domain/use-cases/errors/user-not-found-exception";
import { ResetPasswordUseCase } from "../../../../src/domain/use-cases/user/reset-password-use-case";
import { makeUser } from "../../../domain/factories/make-user";
import { makeBcryptMock } from "../../../infra/mocks/cryptography/make-bcrypt-mock";
import { makeTimeBasedOnTimePasswordMock } from "../../../infra/mocks/cryptography/make-time-based-one-time-password-mock";
import { makeInMemoryUserRepository } from "../../../infra/mocks/repositories/user/in-memory-user-repository";
import { mockValues } from "../../../mock/mock-values";

const makeSut = async () => {
  const { inMemoryUserRepository } = makeInMemoryUserRepository();
  const { bcryptMock } = makeBcryptMock();
  const { timeBasedOnTimePasswordMock } = makeTimeBasedOnTimePasswordMock();
  const sut = new ResetPasswordUseCaseImpl(
    inMemoryUserRepository,
    inMemoryUserRepository,
    bcryptMock,
    timeBasedOnTimePasswordMock,
  );
  const user = makeUser();
  await inMemoryUserRepository.create(user);
  return {
    sut,
    inMemoryUserRepository,
    bcryptMock,
    user,
    timeBasedOnTimePasswordMock,
  };
};
const makeSutWithoutCreateUser = () => {
  const { inMemoryUserRepository } = makeInMemoryUserRepository();
  const { bcryptMock } = makeBcryptMock();
  const { timeBasedOnTimePasswordMock } = makeTimeBasedOnTimePasswordMock();

  const sut = new ResetPasswordUseCaseImpl(
    inMemoryUserRepository,
    inMemoryUserRepository,
    bcryptMock,
    timeBasedOnTimePasswordMock,
  );

  return {
    sut,
    inMemoryUserRepository,
    bcryptMock,
    timeBasedOnTimePasswordMock,
  };
};
const makeRequest = (
  data: Partial<ResetPasswordUseCase.Params> = {},
): ResetPasswordUseCase.Params => {
  return {
    code: mockValues.slug,
    email: mockValues.email,
    resetPassword: mockValues.password,
    ...data,
  };
};
describe("ResetPasswordUseCaseImpl", () => {
  it("should throw exception user not found if user not found", async () => {
    const { sut } = makeSutWithoutCreateUser();
    const exception = sut.handle(makeRequest());
    await expect(exception).rejects.toThrow(new UserNotFoundException());
  });
  it("should throw exception if no has valid code", async () => {
    const { sut, user, inMemoryUserRepository, timeBasedOnTimePasswordMock } =
      await makeSut();
    timeBasedOnTimePasswordMock.isValid = false;
    await inMemoryUserRepository.save(user);
    const exception = sut.handle(makeRequest({ email: user.email }));
    await expect(exception).rejects.toThrow(new UnauthorizedException());
  });

  it("should throw exception if user no has resetPasswordSecret", async () => {
    const { sut, user } = await makeSut();
    const exception = sut.handle(makeRequest({ email: user.email }));
    await expect(exception).rejects.toThrow(new UnauthorizedException());
  });
  it("should save user with hash password if success", async () => {
    const { sut, user, inMemoryUserRepository, bcryptMock } = await makeSut();
    user.resetPasswordSecret = mockValues.password;
    await inMemoryUserRepository.save(user);

    await sut.handle(makeRequest({ email: user.email, code: mockValues.slug }));
    const userAfterSaveInDatabase = await inMemoryUserRepository.findByEmail(
      user.email,
    );

    expect(userAfterSaveInDatabase?.password).toEqual(bcryptMock.response);
  });
});
