import { Project } from '@/app/entities/project'

import { makeProject } from '../factories/make-project'

describe('Project', () => {
  it('should be able create Project', () => {
    expect(makeProject()).toBeInstanceOf(Project)
  })
})
