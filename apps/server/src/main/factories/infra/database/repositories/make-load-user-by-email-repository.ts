import { PrismaService } from "../../../../../infra/database/prisma/prisma-service";
import { PrismaLoadUserByEmailRepository } from "../../../../../infra/database/prisma/repositories/prisma-load-user-by-email-repository";

export const makeLoadUserByEmailRepository = () => {
  return new PrismaLoadUserByEmailRepository(PrismaService.getInstance());
};
