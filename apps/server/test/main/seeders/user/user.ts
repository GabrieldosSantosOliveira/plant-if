import { PrismaService } from "../../../../src/infra/database/prisma/prisma-service";
import { UserRoles } from "../../../../src/domain/entities/user";
import { makeTimeBasedOneTimePassword } from "./../../../../src/main/factories/infra/cryptography/make-time-based-one-time-password";
import { User } from "@prisma/client";
import { makeBcrypt } from "./../../../../src/main/factories/infra/cryptography/make-bcrypt";
import { faker } from "@faker-js/faker";
const prismaService = PrismaService.getInstance();
export const seedUser = async (): Promise<Omit<User, "id">[]> => {
  const bcrypt = makeBcrypt();
  const data: Omit<User, "id">[] = [
    {
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      role: UserRoles.STUDENT,
      password: "123456789!aA",
      resetPasswordSecret:
        await makeTimeBasedOneTimePassword().generateSecret(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      role: UserRoles.STUDENT,
      password: "0987654321Aa#",
      resetPasswordSecret:
        await makeTimeBasedOneTimePassword().generateSecret(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  const users: Omit<User, "id">[] = [];
  for (const user of data) {
    users.push({
      ...user,
      password: await bcrypt.hash(user.password as string),
    });
  }

  await prismaService.user.createMany({
    data: users,
  });
  return data;
};
export const cleanSeedUser = async () => {
  await PrismaService.getInstance().user.deleteMany();
};
