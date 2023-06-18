import { User } from '@/app/entities/user'

import { makeUser } from '../factories/make-user'

describe('User', () => {
  it('should be able create User', () => {
    expect(makeUser()).toBeInstanceOf(User)
  })
})
