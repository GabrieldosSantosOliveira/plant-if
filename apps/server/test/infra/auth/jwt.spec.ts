/* eslint-disable import/first */
const mockSign = jest.fn()
const mockVerify = jest.fn()
jest.mock('jsonwebtoken', () => ({
  sign: mockSign,
  verify: mockVerify,
}))
import { JwtImpl } from '@/infra/auth/jwt-impl'
import { left, right } from '@/shared/either'

const makeSut = () => {
  const sut = new JwtImpl()
  return { sut }
}
describe('JwtImpl', () => {
  afterEach(() => {
    mockSign.mockClear()
    mockVerify.mockClear()
  })
  describe('encrypt', () => {
    it('should call jsonwebtoken sign with correct params', async () => {
      const { sut } = makeSut()
      await sut.encrypt({ sub: 'any_sub' }, { expire: 1, secret: 'any_secret' })
      expect(mockSign).toHaveBeenLastCalledWith(
        { sub: 'any_sub' },
        'any_secret',
        {
          expiresIn: 1,
        },
      )
    })
    it('should return token if jsonwebtoken sign succeeds', async () => {
      const { sut } = makeSut()
      mockSign.mockImplementation(() => 'any_token')
      const token = await sut.encrypt(
        { sub: 'any_sub' },
        { expire: 1, secret: 'any_secret' },
      )
      expect(token).toEqual('any_token')
    })
    it('should throw if jsonwebtoken throw', async () => {
      const { sut } = makeSut()
      mockSign.mockImplementation(() => {
        throw new Error()
      })

      await expect(
        sut.encrypt({ sub: 'any_sub' }, { expire: 1, secret: 'any_secret' }),
      ).rejects.toThrow()
    })
  })
  describe('decrypt', () => {
    it('should call jsonwebtoken verify with correct params', async () => {
      const { sut } = makeSut()
      await sut.decrypt('any_token', { secret: 'any_secret' })
      expect(mockVerify).toHaveBeenLastCalledWith('any_token', 'any_secret')
    })
    it('should return right if jsonwebtoken sign succeeds', async () => {
      const { sut } = makeSut()
      mockVerify.mockImplementation(() => ({ sub: 'any_sub' }))
      const payload = await sut.decrypt('any_token', {
        secret: 'any_secret',
      })
      expect(payload).toEqual(right({ sub: 'any_sub' }))
    })
    it('should return left if jsonwebtoken throw', async () => {
      const { sut } = makeSut()
      mockVerify.mockImplementation(() => {
        throw new Error()
      })
      const error = await sut.decrypt('any_token', { secret: 'any_secret' })
      expect(error).toEqual(left(new Error('Invalid token')))
    })
  })
})
