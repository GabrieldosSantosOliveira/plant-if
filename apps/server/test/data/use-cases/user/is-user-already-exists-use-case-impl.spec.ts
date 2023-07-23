import { IsUserAlreadyExistsUseCaseImpl } from '@/data/use-cases/user/is-user-already-exists-use-case-impl'
import { IsUserAlreadyExistsUseCaseRequest } from '@/domain/use-cases/user/is-user-already-exists-use-case'
import { makeUser } from '@/test/domain/factories/make-user'
import { faker } from '@faker-js/faker'

import { makeInMemoryUserRepository } from '../../../infra/mocks/repositories/user/in-memory-user-repository'

const makeSut = () => {
  const { inMemoryUserRepository } = makeInMemoryUserRepository()
  const sut = new IsUserAlreadyExistsUseCaseImpl(inMemoryUserRepository)
  return { sut, inMemoryUserRepository }
}
const makeRequest = (
  request: Partial<IsUserAlreadyExistsUseCaseRequest> = {},
): IsUserAlreadyExistsUseCaseRequest => {
  return {
    email: faker.internet.email(),
    ...request,
  }
}

describe('IsUserAlreadyExistsUseCaseImpl', () => {
  it('should return false if user not exists', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(makeRequest())
    expect(response).toBeFalsy()
  })
  it('should return true if user exists', async () => {
    const { sut, inMemoryUserRepository } = makeSut()
    const user = makeUser()
    await inMemoryUserRepository.create(user)
    const response = await sut.handle(makeRequest({ email: user.email }))
    expect(response).toBeTruthy()
  })

  it('should call LoadUserByEmailRepository with correct email', async () => {
    const { sut, inMemoryUserRepository } = makeSut()
    const email = faker.internet.email()
    const inMemoryUserRepositorySpy = jest.spyOn(
      inMemoryUserRepository,
      'findByEmail',
    )
    await sut.handle({ email })
    expect(inMemoryUserRepositorySpy).toHaveBeenCalledWith(email)
  })
})
