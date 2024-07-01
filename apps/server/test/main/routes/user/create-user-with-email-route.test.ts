import { setupApp } from "./../../../../src/main/config/setup-app";
import { Express } from "express";
import request from "supertest";
import { mockValues } from "../../../mock/mock-values";
import { PrismaService } from "./../../../../src/infra/database/prisma/prisma-service";
let app: Express;
const url = "/api/user/auth/sing-up/email";
describe("Create User With Email Route", () => {
  beforeEach(async () => {
    app = await setupApp();
  });
  afterEach(async () => {
    await PrismaService.getInstance().user.deleteMany();
  });
  afterAll(async () => {
    await PrismaService.getInstance().$disconnect();
  });
  it("should create a user if success", async () => {
    const { statusCode } = await request(app).post(url).send({
      email: mockValues.email,
      firstName: mockValues.firstName,
      lastName: mockValues.lastName,
      password: mockValues.password,
    });
    expect(statusCode).toBe(201);
  });
  it("should return 400 if email is not provided", async () => {
    const { statusCode } = await request(app).post(url).send({
      firstName: mockValues.firstName,
      lastName: mockValues.lastName,
      password: mockValues.password,
    });
    expect(statusCode).toBe(400);
  });
  it("should return 400 if firstName is not provided", async () => {
    const { statusCode } = await request(app).post(url).send({
      email: mockValues.email,
      lastName: mockValues.lastName,
      password: mockValues.password,
    });
    expect(statusCode).toBe(400);
  });

  it("should return 400 if lastName is not provided", async () => {
    const { statusCode } = await request(app).post(url).send({
      email: mockValues.email,
      firstName: mockValues.firstName,
      password: mockValues.password,
    });
    expect(statusCode).toBe(400);
  });
  it("should return 400 if firstName is not provided", async () => {
    const { statusCode } = await request(app).post(url).send({
      email: mockValues.email,
      lastName: mockValues.lastName,
      firstName: mockValues.firstName,
    });
    expect(statusCode).toBe(400);
  });
  it("should return 400 if email is not valid", async () => {
    const { statusCode } = await request(app).post(url).send({
      email: "invalid_email",
      lastName: mockValues.lastName,
      firstName: mockValues.firstName,
    });
    expect(statusCode).toBe(400);
  });
  it("should return 400 if email is not valid", async () => {
    const { statusCode } = await request(app).post(url).send({
      email: "invalid_email",
      lastName: mockValues.lastName,
      firstName: mockValues.firstName,
    });
    expect(statusCode).toBe(400);
  });
});
