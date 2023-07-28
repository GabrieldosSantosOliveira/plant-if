import { HashComparer } from '@/data/protocols/cryptography/hash-comparer'

export class HashComparerMock implements HashComparer {
  public isValid = true
  async compare(): Promise<boolean> {
    return this.isValid
  }
}
export const makeHashComparerMock = () => {
  const hashComparerMock = new HashComparerMock()
  return { hashComparerMock }
}
