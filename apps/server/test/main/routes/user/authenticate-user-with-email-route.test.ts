import { Express } from "express";
import request from "supertest";
import { setupApp } from "../../../../src/main/config/setup-app";
import { cleanSeedUser, seedUser } from "../../seeders/user/user";
import { User } from "@prisma/client";
import { PrismaService } from "../../../../src/infra/database/prisma/prisma-service";
let app: Express;
const url = "/api/user/auth/sing-in/email";
let users: Omit<User, "id">[];
describe("Authenticate User With Email Route", () => {
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
  it("should return 200 if success", async () => {
    const response = await request(app)
      .post(url)
      .set("Accept", "application/json")
      .send({ email: users[0]?.email, password: users[0]?.password });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("accessToken");
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("refreshToken");
  });
  it("should return 404 if user not exists", async () => {
    const { statusCode } = await request(app)
      .post(url)
      .send({ email: "any_user@gmail.com", password: "123456789!Aa" });
    expect(statusCode).toBe(404);
  });
  it("should return 401 if a invalid password is provided", async () => {
    const { statusCode } = await request(app)
      .post(url)
      .send({
        email: users[0]?.email,
        password: users[0]?.password + "any_password",
      });
    expect(statusCode).toBe(401);
  });
  it("should return 400 if email is not provided", async () => {
    const { statusCode } = await request(app)
      .post(url)
      .send({
        password: users[0]?.password + "any_password",
      });
    expect(statusCode).toBe(400);
  });
  it("should return 400 if password is not provided", async () => {
    const { statusCode } = await request(app).post(url).send({
      email: users[0]?.email,
    });
    expect(statusCode).toBe(400);
  });
  it("should return 400 if a invalid email is provided", async () => {
    const { statusCode } = await request(app)
      .post(url)
      .send({
        email: "invalid_email",
        password: users[0]?.password + "any_password",
      });
    expect(statusCode).toBe(400);
  });
});
