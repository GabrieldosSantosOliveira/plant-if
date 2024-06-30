import { ForgotPasswordUseCaseImpl } from "../../../../src/data/use-cases/user/forgot-password-use-case-impl";
import { UserNotFoundException } from "../../../../src/domain/use-cases/errors/user-not-found-exception";
import { ForgotPasswordUseCase } from "../../../../src/domain/use-cases/user/forgot-password-use-case";
import { makeUser } from "../../../domain/factories/make-user";
import { makeTimeBasedOnTimePasswordMock } from "../../../infra/mocks/cryptography/make-time-based-one-time-password-mock";
import { makeSendMailMock } from "../../../infra/mocks/gateways/email/send-mail";
import { makeGenerateRandomNumberMock } from "../../../infra/mocks/gateways/random-number/generate-random-number-mock";
import { makeInMemoryUserRepository } from "../../../infra/mocks/repositories/user/in-memory-user-repository";
import { mockValues } from "../../../mock/mock-values";

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
  request: Partial<ForgotPasswordUseCase.Params> = {},
): ForgotPasswordUseCase.Params => {
  return {
    email: mockValues.email,
    ...request,
  };
};
describe("ForgotPasswordUseCaseImpl", () => {
  it("should throw exception if user not found", async () => {
    const { sut } = makeSutWithoutCreateUser();
    const exception = sut.handle(makeRequest());
    await expect(exception).rejects.toThrow(new UserNotFoundException());
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
