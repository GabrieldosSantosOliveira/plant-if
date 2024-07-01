import { User } from "@prisma/client";
import { Express } from "express";
import request from "supertest";
import { setupApp } from "../../../../src/main/config/setup-app";
import { cleanSeedUser, seedUser } from "../../seeders/user/user";
import { PrismaService } from "../../../../src/infra/database/prisma/prisma-service";
import { makeTimeBasedOneTimePassword } from "../../../../src/main/factories/infra/cryptography/make-time-based-one-time-password";
import { makeBcrypt } from "../../../../src/main/factories/infra/cryptography/make-bcrypt";
let app: Express;
const url = "/api/user/auth/reset-password";
let users: Omit<User, "id">[];
const bcrypt = makeBcrypt();
const timeBasedOneTimePassword = makeTimeBasedOneTimePassword();
describe("Reset Password Route", () => {
  beforeEach(async () => {
    app = await setupApp();
    users = await seedUser();
  });
  afterEach(async () => {
    await cleanSeedUser();
  });
  afterAll(async () => {
    await PrismaService.getInstance().$disconnect();
  });
  it("should reset password if a valid code is provided", async () => {
    const resetPassword = "54378Bb@81826";
    const response = await request(app)
      .post(url)
      .send({
        email: users[0]?.email,
        code: await timeBasedOneTimePassword.generatePassword(
          users[0]?.resetPasswordSecret as string,
          60,
        ),
        resetPassword,
      });
    const user = await PrismaService.getInstance().user.findUnique({
      where: { email: users[0]?.email },
    });
    expect(response.statusCode).toBe(204);
    await expect(
      bcrypt.compare(resetPassword, user?.password as string),
    ).resolves.toBe(true);
  });
  it("should return 400 if email is not provided", async () => {
    const resetPassword = "54378Bb@81826";
    const response = await request(app)
      .post(url)
      .send({
        code: await timeBasedOneTimePassword.generatePassword(
          users[0]?.resetPasswordSecret as string,
          60,
        ),
        resetPassword,
      });

    expect(response.statusCode).toBe(400);
  });
  it("should return 400 if code is not provided", async () => {
    const resetPassword = "54378Bb@81826";
    const response = await request(app).post(url).send({
      email: users[0]?.email,
      resetPassword,
    });

    expect(response.statusCode).toBe(400);
  });
  it("should return 400 if resetPassword is not provided", async () => {
    const response = await request(app)
      .post(url)
      .send({
        email: users[0]?.email,
        code: await timeBasedOneTimePassword.generatePassword(
          users[0]?.resetPasswordSecret as string,
          60,
        ),
      });

    expect(response.statusCode).toBe(400);
  });
  it("should return 400 if a invalid email is provided", async () => {
    const resetPassword = "54378Bb@81826";

    const response = await request(app)
      .post(url)
      .send({
        email: "invalid_email",
        code: await timeBasedOneTimePassword.generatePassword(
          users[0]?.resetPasswordSecret as string,
          60,
        ),
        resetPassword,
      });

    expect(response.statusCode).toBe(400);
  });
});
