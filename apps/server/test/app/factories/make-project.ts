import { Project, ProjectProps } from '@/app/entities/project'
import { faker } from '@faker-js/faker'

export const makeProject = (project: Partial<ProjectProps> = {}) => {
  return new Project({
    endDate: faker.date.future(),
    startDate: faker.date.past(),
    management: [faker.lorem.paragraph()],
    resources: [faker.lorem.paragraph()],
    title: faker.lorem.text(),
    codeShareForStudents: faker.string.uuid(),
    codeShareForTeachers: faker.string.uuid(),
    id: faker.string.uuid(),
  })
}
