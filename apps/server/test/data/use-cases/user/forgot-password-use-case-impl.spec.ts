import { ForgotPasswordUseCaseImpl } from "@/data/use-cases/user/forgot-password-use-case-impl";
import { UserNotFoundException } from "@/domain/use-cases/errors/user-not-found-exception";
import { ForgotPasswordUseCaseRequest } from "@/domain/use-cases/user/forgot-password-use-case";
import { left } from "@/shared/either";
import { makeUser } from "@/test/domain/factories/make-user";
import { makeTimeBasedOnTimePasswordMock } from "@/test/infra/mocks/cryptography/make-time-based-one-time-password-mock";
import { makeSendMailMock } from "@/test/infra/mocks/gateways/email/send-mail";
import { makeGenerateRandomNumberMock } from "@/test/infra/mocks/gateways/random-number/generate-random-number-mock";
import { makeInMemoryUserRepository } from "@/test/infra/mocks/repositories/user/in-memory-user-repository";
import { faker } from "@faker-js/faker";

const makeSut = async () => {
  const { inMemoryUserRepository } = makeInMemoryUserRepository();
  const { sendMailMock } = makeSendMailMock();
  const { timeBasedOnTimePasswordMock } = makeTimeBasedOnTimePasswordMock();
  const sut = new ForgotPasswordUseCaseImpl(
    inMemoryUserRepository,
    inMemoryUserRepository,
    sendMailMock,
    timeBasedOnTimePasswordMock,
  );
  const user = makeUser();
  await inMemoryUserRepository.create(user);
  return {
    sut,
    inMemoryUserRepository,
    sendMailMock,
    timeBasedOnTimePasswordMock,
    user,
  };
};
const makeSutWithoutCreateUser = () => {
  const { inMemoryUserRepository } = makeInMemoryUserRepository();
  const { sendMailMock } = makeSendMailMock();
  const { generateRandomNumberMock } = makeGenerateRandomNumberMock();
  const { timeBasedOnTimePasswordMock } = makeTimeBasedOnTimePasswordMock();
  const sut = new ForgotPasswordUseCaseImpl(
    inMemoryUserRepository,
    inMemoryUserRepository,
    sendMailMock,
    timeBasedOnTimePasswordMock,
  );
  return {
    sut,
    inMemoryUserRepository,
    sendMailMock,
    generateRandomNumberMock,
  };
};
const makeRequest = (
  request: Partial<ForgotPasswordUseCaseRequest> = {},
): ForgotPasswordUseCaseRequest => {
  return {
    email: faker.internet.email(),
    ...request,
  };
};
describe("ForgotPasswordUseCaseImpl", () => {
  it("should return exception if user not found", async () => {
    const { sut } = makeSutWithoutCreateUser();
    const response = await sut.handle(makeRequest());
    expect(response).toEqual(left(new UserNotFoundException()));
  });
  it("should save user with resetPasswordSecret", async () => {
    const { sut, inMemoryUserRepository, user } = await makeSut();
    await sut.handle(makeRequest({ email: user.email }));
    const userSaveAfter = await inMemoryUserRepository.findByEmail(user.email);
    expect(userSaveAfter?.resetPasswordSecret).toBeTruthy();
  });
  it("should send mail with resetPasswordToken", async () => {
    const { sut, sendMailMock, user, timeBasedOnTimePasswordMock } =
      await makeSut();
    await sut.handle(makeRequest({ email: user.email }));
    expect(sendMailMock.param?.body).toContain(
      timeBasedOnTimePasswordMock.password,
    );
  });
});
