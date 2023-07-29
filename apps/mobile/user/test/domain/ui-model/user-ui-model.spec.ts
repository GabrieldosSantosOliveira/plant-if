import { UserUiModel } from '@/domain/ui-model/user-ui-model'

import { makeUserUiModel } from '../factories/make-user-ui-model'

describe('UserUiModel', () => {
  it('should be able create user-ui-model', () => {
    expect(makeUserUiModel()).toBeInstanceOf(UserUiModel)
  })
})
