import { ResetPasswordUseCaseImpl } from "@/data/use-cases/user/reset-password-use-case-impl";
import { UnauthorizedException } from "@/domain/use-cases/errors/unauthorized-exception";
import { UserNotFoundException } from "@/domain/use-cases/errors/user-not-found-exception";
import { ResetPasswordUseCaseRequest } from "@/domain/use-cases/user/reset-password-use-case";
import { left } from "@/shared/either";
import { makeUser } from "@/test/domain/factories/make-user";
import { makeHasherMock } from "@/test/infra/mocks/cryptography/make-hasher-mock";
import { makeTimeBasedOnTimePasswordMock } from "@/test/infra/mocks/cryptography/make-time-based-one-time-password-mock";
import { makeInMemoryUserRepository } from "@/test/infra/mocks/repositories/user/in-memory-user-repository";
import { faker } from "@faker-js/faker";

const makeSut = async () => {
  const { inMemoryUserRepository } = makeInMemoryUserRepository();
  const { hasherMock } = makeHasherMock();
  const { timeBasedOnTimePasswordMock } = makeTimeBasedOnTimePasswordMock();
  const sut = new ResetPasswordUseCaseImpl(
    inMemoryUserRepository,
    inMemoryUserRepository,
    hasherMock,
    timeBasedOnTimePasswordMock,
  );
  const user = makeUser();
  await inMemoryUserRepository.create(user);
  return {
    sut,
    inMemoryUserRepository,
    hasherMock,
    user,
    timeBasedOnTimePasswordMock,
  };
};
const makeSutWithoutCreateUser = () => {
  const { inMemoryUserRepository } = makeInMemoryUserRepository();
  const { hasherMock } = makeHasherMock();
  const { timeBasedOnTimePasswordMock } = makeTimeBasedOnTimePasswordMock();

  const sut = new ResetPasswordUseCaseImpl(
    inMemoryUserRepository,
    inMemoryUserRepository,
    hasherMock,
    timeBasedOnTimePasswordMock,
  );

  return {
    sut,
    inMemoryUserRepository,
    hasherMock,
    timeBasedOnTimePasswordMock,
  };
};
const makeRequest = (
  data: Partial<ResetPasswordUseCaseRequest> = {},
): ResetPasswordUseCaseRequest => {
  return {
    code: faker.lorem.words(),
    email: faker.internet.email(),
    resetPassword: faker.lorem.words(),
    ...data,
  };
};
describe("ResetPasswordUseCaseImpl", () => {
  it("should return exception user not found if user not found", async () => {
    const { sut } = makeSutWithoutCreateUser();
    const exception = await sut.handle(makeRequest());
    expect(exception).toEqual(left(new UserNotFoundException()));
  });
  it("should return exception if no has valid code", async () => {
    const { sut, user, inMemoryUserRepository, timeBasedOnTimePasswordMock } =
      await makeSut();
    timeBasedOnTimePasswordMock.isValid = false;
    await inMemoryUserRepository.save(user);
    const exception = await sut.handle(makeRequest({ email: user.email }));
    expect(exception).toEqual(left(new UnauthorizedException()));
  });

  it("should return exception if user no has resetPasswordSecret", async () => {
    const { sut, user } = await makeSut();
    const exception = await sut.handle(makeRequest({ email: user.email }));
    expect(exception).toEqual(left(new UnauthorizedException()));
  });
  it("should save user with hash password if success", async () => {
    const { sut, user, inMemoryUserRepository, hasherMock } = await makeSut();
    user.resetPasswordSecret = faker.lorem.words();
    await inMemoryUserRepository.save(user);

    await sut.handle(
      makeRequest({ email: user.email, code: faker.lorem.words() }),
    );
    const userAfterSaveInDatabase = await inMemoryUserRepository.findByEmail(
      user.email,
    );

    expect(userAfterSaveInDatabase?.password).toEqual(hasherMock.response);
  });
});
