import { PrismaService } from "../../../../../infra/database/prisma/prisma-service";
import { PrismaCreateUserRepository } from "../../../../../infra/database/prisma/repositories/prisma-create-user-repository";

export const makeCreateUserRepository = () => {
  return new PrismaCreateUserRepository(PrismaService.getInstance());
};
