import { UserDto } from '@/infra/data-source/dtos/user-dto';
import { faker } from '@faker-js/faker';

export const makeUserDto = (userDto: Partial<UserDto> = {}): UserDto => {
  return {
    createdAt: new Date().toISOString(),
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    id: faker.string.uuid(),
    lastName: faker.person.lastName(),
    updatedAt: new Date().toISOString(),
    ...userDto,
  };
};
