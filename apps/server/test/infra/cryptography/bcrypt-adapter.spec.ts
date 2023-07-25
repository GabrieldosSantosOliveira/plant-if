/* eslint-disable import/first */
const mockCompare = jest.fn()
const mockHash = jest.fn()
jest.mock('bcryptjs', () => ({
  compare: mockCompare,
  hash: mockHash,
}))
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter'
import { faker } from '@faker-js/faker'

const salt = 12
const makeSut = () => {
  const sut = new BcryptAdapter(salt)
  return { sut }
}
describe('BcryptAdapter', () => {
  afterEach(() => {
    mockCompare.mockClear()
    mockHash.mockClear()
  })
  describe('hash', () => {
    it('should return hash if success', async () => {
      const { sut } = makeSut()
      mockHash.mockImplementation(() => 'any_hash')
      const hash = await sut.hash(faker.lorem.words())
      expect(hash).toBe('any_hash')
    })
    it('should call hash with correct params', async () => {
      const { sut } = makeSut()
      const plaintext = faker.lorem.words()
      await sut.hash(plaintext)
      expect(mockHash).toHaveBeenCalledWith(plaintext, salt)
    })
    it('should throw if bcrypt hash throw', async () => {
      const { sut } = makeSut()
      mockHash.mockImplementation(() => {
        throw new Error()
      })
      await expect(sut.hash(faker.lorem.words())).rejects.toThrow()
    })
  })
  describe('compare', () => {
    it('should return true when compare succeeds', async () => {
      const { sut } = makeSut()
      mockCompare.mockImplementation(() => true)
      const isValid = await sut.compare('any_plain_text', 'any_digest')
      expect(isValid).toBe(true)
    })
    it('should return true when compare fails', async () => {
      const { sut } = makeSut()
      mockCompare.mockImplementation(() => false)
      const isValid = await sut.compare('any_plain_text', 'any_digest')
      expect(isValid).toBe(false)
    })
    it('should throw if bcrypt compare throw', async () => {
      const { sut } = makeSut()
      mockCompare.mockImplementation(() => {
        throw new Error()
      })
      await expect(
        sut.compare('any_plain_text', 'any_digest'),
      ).rejects.toThrow()
    })
  })
})
