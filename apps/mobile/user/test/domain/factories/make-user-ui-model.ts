import { UserUiModel } from '@/domain/ui-model/user-ui-model';
import { makeFaker } from '@/test/mock/faker';
const { faker } = makeFaker();
export const makeUserUiModel = () => {
  return new UserUiModel({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    email: faker.internet.email(),
    id: faker.string.uuid(),
  });
};
