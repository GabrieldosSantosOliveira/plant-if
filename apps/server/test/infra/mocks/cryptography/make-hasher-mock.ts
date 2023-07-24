import { Hasher } from '@/data/protocols/cryptography/hasher'
import { faker } from '@faker-js/faker'

export class HasherMock implements Hasher {
  public response = faker.lorem.words()
  async hash(): Promise<string> {
    return this.response
  }
}
export const makeHasherMock = () => {
  const hasherMock = new HasherMock()
  return { hasherMock }
}
