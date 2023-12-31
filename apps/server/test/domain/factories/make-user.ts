import { User, UserProps } from '@/domain/entities/user'
import { faker } from '@faker-js/faker'
export const makeUser = (user: Partial<UserProps> = {}) => {
  return new User({
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    image: faker.internet.avatar(),
    id: faker.string.uuid(),
    password: faker.internet.password(),
    ...user,
  })
}
