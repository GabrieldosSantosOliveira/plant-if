import { ForgotPasswordUseCaseImpl } from '@/data/use-cases/user/forgot-password-use-case-impl'
import { UserNotFoundException } from '@/domain/use-cases/errors/user-not-found-exception'
import { ForgotPasswordUseCaseRequest } from '@/domain/use-cases/user/forgot-password-use-case'
import { left } from '@/shared/either'
import { makeUser } from '@/test/domain/factories/make-user'
import { makeSendMailMock } from '@/test/infra/mocks/gateways/email/send-mail'
import { makeGenerateRandomNumberMock } from '@/test/infra/mocks/gateways/random-number/generate-random-number-mock'
import { makeInMemoryUserRepository } from '@/test/infra/mocks/repositories/user/in-memory-user-repository'
import { makeDateWithMoreHours } from '@/utils/date/make-date-with-more-hours'
import { faker } from '@faker-js/faker'

const makeSut = async () => {
  const { inMemoryUserRepository } = makeInMemoryUserRepository()
  const { sendMailMock } = makeSendMailMock()
  const { generateRandomNumberMock } = makeGenerateRandomNumberMock()
  const sut = new ForgotPasswordUseCaseImpl(
    inMemoryUserRepository,
    inMemoryUserRepository,
    sendMailMock,
    generateRandomNumberMock,
  )
  const user = makeUser()
  await inMemoryUserRepository.create(user)
  return {
    sut,
    inMemoryUserRepository,
    sendMailMock,
    generateRandomNumberMock,
    user,
  }
}
const makeSutWithoutCreateUser = () => {
  const { inMemoryUserRepository } = makeInMemoryUserRepository()
  const { sendMailMock } = makeSendMailMock()
  const { generateRandomNumberMock } = makeGenerateRandomNumberMock()
  const sut = new ForgotPasswordUseCaseImpl(
    inMemoryUserRepository,
    inMemoryUserRepository,
    sendMailMock,
    generateRandomNumberMock,
  )
  return { sut, inMemoryUserRepository, sendMailMock, generateRandomNumberMock }
}
const makeRequest = (
  request: Partial<ForgotPasswordUseCaseRequest> = {},
): ForgotPasswordUseCaseRequest => {
  return {
    email: faker.internet.email(),
    ...request,
  }
}
describe('ForgotPasswordUseCaseImpl', () => {
  it('should return exception if user not found', async () => {
    const { sut } = makeSutWithoutCreateUser()
    const response = await sut.handle(makeRequest())
    expect(response).toEqual(left(new UserNotFoundException()))
  })
  it('should save user with resetPasswordToken and resetPasswordExpires', async () => {
    const { sut, inMemoryUserRepository, user } = await makeSut()
    await sut.handle(makeRequest({ email: user.email }))
    const userSaveAfter = await inMemoryUserRepository.findByEmail(user.email)
    expect(userSaveAfter?.resetPasswordToken).toBeTruthy()
    expect(userSaveAfter?.resetPasswordExpires).toBeTruthy()
  })
  it('should send mail with resetPasswordToken', async () => {
    const { sut, sendMailMock, generateRandomNumberMock, user } =
      await makeSut()
    generateRandomNumberMock.response = faker.number.int({ min: 6 })
    await sut.handle(makeRequest({ email: user.email }))
    expect(sendMailMock.param?.body).toContain(
      generateRandomNumberMock.response.toString(),
    )
  })
  it('should set resetPasswordToken with two hours expiration', async () => {
    const { sut, user, inMemoryUserRepository } = await makeSut()
    jest.useFakeTimers()
    await sut.handle(makeRequest({ email: user.email }))
    const userAfterSave = await inMemoryUserRepository.findByEmail(user.email)
    const resetPasswordTokenHours =
      userAfterSave?.resetPasswordExpires?.getTime()

    const resetPasswordTokenHasTwoHoursExpiration =
      makeDateWithMoreHours(2).getTime() === resetPasswordTokenHours

    expect(resetPasswordTokenHasTwoHoursExpiration).toBeTruthy()
  })
})
