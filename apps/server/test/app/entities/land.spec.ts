import { Land } from '@/app/entities/land'

import { makeLand } from '../factories/make-land'

describe('Land', () => {
  it('should be able create Land', () => {
    expect(makeLand()).toBeInstanceOf(Land)
  })
})
