import { ResetPasswordUseCaseImpl } from '@/data/use-cases/auth/reset-password-use-case-impl'
import { UnexpectedException } from '@/domain/use-cases/errors/unexpected-exception'
import { ResetPasswordUseCaseDto } from '@/domain/use-cases/reset-password-use-case'
import { left, right } from '@/shared/either'
import { faker } from '@faker-js/faker'

import {
  makeResetPasswordRepositoryMock,
  makeResetPasswordRepositoryMockWithError,
  makeResetPasswordRepositoryMockWithException,
} from '../mocks/use-cases/auth/make-reset-password-repository-mock'

const makeSut = () => {
  const { resetPasswordRepositoryMock } = makeResetPasswordRepositoryMock()
  const sut = new ResetPasswordUseCaseImpl(resetPasswordRepositoryMock)
  return { sut, resetPasswordRepositoryMock }
}
const makeSutWithError = () => {
  const { resetPasswordRepositoryMockWithError } =
    makeResetPasswordRepositoryMockWithError()
  const sut = new ResetPasswordUseCaseImpl(resetPasswordRepositoryMockWithError)
  return { sut, resetPasswordRepositoryMockWithError }
}
const makeSutWithException = () => {
  const { resetPasswordRepositoryMockWithException } =
    makeResetPasswordRepositoryMockWithException()
  const sut = new ResetPasswordUseCaseImpl(
    resetPasswordRepositoryMockWithException,
  )
  return { sut, resetPasswordRepositoryMockWithException }
}
const makeRequest = (): ResetPasswordUseCaseDto => {
  return {
    code: faker.lorem.words(),
    email: faker.internet.email(),
    resetPassword: faker.lorem.words(),
  }
}
describe('ResetPasswordUseCaseImpl', () => {
  it('should return null if success', async () => {
    const { sut } = makeSut()
    const response = await sut.execute(makeRequest())
    expect(response).toEqual(right(null))
  })
  it('should call if ResetPasswordRepository correct params', async () => {
    const { sut, resetPasswordRepositoryMock } = makeSut()
    const resetPasswordRepositorySpy = jest.spyOn(
      resetPasswordRepositoryMock,
      'execute',
    )
    const request = makeRequest()
    await sut.execute(request)
    expect(resetPasswordRepositorySpy).toHaveBeenCalledWith({
      code: request.code,
      email: request.email,
      resetPassword: request.resetPassword,
    })
  })
  it('should throw if ResetPasswordRepository throw', async () => {
    const { sut } = makeSutWithError()
    await expect(sut.execute(makeRequest())).rejects.toThrow()
  })
  it('should return exception if ResetPasswordRepository return exception', async () => {
    const { sut } = makeSutWithException()
    const exception = await sut.execute(makeRequest())
    expect(exception).toEqual(left(new UnexpectedException()))
  })
})
