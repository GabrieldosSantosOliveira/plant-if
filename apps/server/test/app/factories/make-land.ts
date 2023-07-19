import { Land, LandProps } from '@/app/entities/land'
import { faker } from '@faker-js/faker'

export const makeLand = (land: Partial<LandProps> = {}) => {
  return new Land({
    name: faker.lorem.word(),
    id: faker.string.uuid(),
    ...land,
  })
}
