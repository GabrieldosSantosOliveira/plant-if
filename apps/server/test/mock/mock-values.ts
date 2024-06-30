import { faker } from "@faker-js/faker";

export const mockValues = {
  email: faker.internet.email(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  password: faker.internet.password(),
  id: faker.number.int(),
  slug: faker.lorem.slug(),
  url: faker.internet.url(),
  uuid: faker.string.uuid(),
};
