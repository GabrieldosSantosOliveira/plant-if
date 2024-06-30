const mockSign = jest.fn();
const mockVerify = jest.fn();
jest.mock("jsonwebtoken", () => ({
  sign: mockSign,
  verify: mockVerify,
}));
import { JsonWebTokenImpl } from "../../../src/infra/auth/json-web-token-impl";

const makeSut = () => {
  const sut = new JsonWebTokenImpl();
  return { sut };
};
const any_id = 1;
describe("JsonWebTokenImpl", () => {
  afterEach(() => {
    mockSign.mockClear();
    mockVerify.mockClear();
  });
  describe("sign", () => {
    it("should call jsonwebtoken sign with correct params", async () => {
      const { sut } = makeSut();
      await sut.sign({ sub: "any_sub" }, { expire: 1, secret: "any_secret" });
      expect(mockSign).toHaveBeenLastCalledWith(
        { sub: "any_sub" },
        "any_secret",
        {
          expiresIn: 1,
        },
      );
    });
    it("should return token if jsonwebtoken sign succeeds", async () => {
      const { sut } = makeSut();
      mockSign.mockImplementation(() => "any_token");
      const token = await sut.sign(
        { sub: "any_sub" },
        { expire: 1, secret: "any_secret" },
      );
      expect(token).toEqual("any_token");
    });
    it("should throw if jsonwebtoken throw", async () => {
      const { sut } = makeSut();
      mockSign.mockImplementation(() => {
        throw new Error();
      });

      await expect(
        sut.sign({ sub: "any_sub" }, { expire: 1, secret: "any_secret" }),
      ).rejects.toThrow();
    });
  });
  describe("verify", () => {
    it("should call jsonwebtoken verify with correct params", async () => {
      const { sut } = makeSut();
      await sut.verify("any_token", { secret: "any_secret" });
      expect(mockVerify).toHaveBeenLastCalledWith("any_token", "any_secret");
    });
    it("should return success if jsonwebtoken sign succeeds", async () => {
      const { sut } = makeSut();
      mockVerify.mockImplementation(() => ({ sub: any_id }));
      const payload = await sut.verify("any_token", {
        secret: "any_secret",
      });
      expect(payload).toEqual({ success: { sub: any_id } });
    });
    it("should return error if jsonwebtoken return error", async () => {
      const { sut } = makeSut();
      mockVerify.mockImplementation(() => {
        throw new Error();
      });
      const error = await sut.verify("any_token", { secret: "any_secret" });
      expect(error.error).toBeTruthy();
      expect(error.error?.length).toBeTruthy();
    });
  });
});
