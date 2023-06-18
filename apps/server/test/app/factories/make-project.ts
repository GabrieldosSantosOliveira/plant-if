import { Project, ProjectProps } from '@/app/entities/project'
import { faker } from '@faker-js/faker'

import { makeTechnician } from './make-technician'
import { makeUser } from './make-user'

export const makeProject = (project: Partial<ProjectProps> = {}) => {
  return new Project({
    teachers: [makeUser()],
    students: [makeUser()],
    endDate: faker.date.future(),
    startDate: faker.date.past(),
    management: [faker.lorem.paragraph()],
    resources: [faker.lorem.paragraph()],
    technician: [makeTechnician()],
    title: faker.lorem.text(),
  })
}
