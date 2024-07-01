import { User } from "@prisma/client";
import { Express } from "express";
import request from "supertest";
import { cleanSeedUser, seedUser } from "../../seeders/user/user";
import { setupApp } from "../../../../src/main/config/setup-app";
import { PrismaService } from "../../../../src/infra/database/prisma/prisma-service";
let app: Express;
const url = "/api/user/auth/forgot-password";
let users: Omit<User, "id">[];
describe("Forgot Password Route", () => {
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
  it("should send a email to the user with a code to reset the password", async () => {
    const response = await request(app).post(url).send({
      email: users[0]?.email,
    });
    expect(response.statusCode).toBe(204);
  });
  it("should return 404 if user not exists", async () => {
    const response = await request(app).post(url).send({
      email: "any_email@gmail.com",
    });
    expect(response.statusCode).toBe(404);
  });
  it("should return 400 if email is not provided", async () => {
    const response = await request(app).post(url).send({});
    expect(response.statusCode).toBe(400);
  });
  it("should return 400 if a invalid email is provided", async () => {
    const response = await request(app).post(url).send({
      email: "invalid_email",
    });
    expect(response.statusCode).toBe(400);
  });
});
