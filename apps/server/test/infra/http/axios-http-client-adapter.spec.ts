const mockGetAxios = jest.fn();
const mockPostAxios = jest.fn();

jest.mock("axios", () => {
  return {
    get: mockGetAxios,
    post: mockPostAxios,
  };
});
import { AxiosHttpClientAdapter } from "../../../src/infra/http/axios-http-client-adapter";

const makeSut = () => {
  const sut = new AxiosHttpClientAdapter();
  return { sut };
};

describe("AxiosHttpClientAdapter", () => {
  afterEach(() => {
    mockGetAxios.mockClear();
    mockPostAxios.mockClear();
  });
  describe("post", () => {
    it("should return data and statusCode if success", async () => {
      const { sut } = makeSut();
      mockPostAxios.mockResolvedValue({
        data: "any_data",
        status: 200,
      });
      const response = await sut.post("/any_endpoint");
      expect(response.statusCode).toBe(200);
      expect(response.data).toEqual("any_data");
    });
    it("should call axios with correct params", async () => {
      const { sut } = makeSut();
      mockPostAxios.mockResolvedValue({
        data: "any_data",
        status: 200,
      });
      await sut.post("/any_endpoint", {
        body: "any_body",
        headers: {
          Authorization: "any_authorization",
          ContentType: "application/json",
        },
        params: {
          key: "any_key",
        },
      });
      expect(mockPostAxios).toHaveBeenCalledWith("/any_endpoint", "any_body", {
        headers: {
          Authorization: "any_authorization",
          "Content-Type": "application/json",
        },
        params: {
          key: "any_key",
        },
      });
    });
  });
  describe("get", () => {
    it("should return data and statusCode if success", async () => {
      const { sut } = makeSut();
      mockGetAxios.mockResolvedValue({
        data: "any_data",
        status: 200,
      });
      const response = await sut.get("/any_endpoint");
      expect(response.statusCode).toBe(200);
      expect(response.data).toEqual("any_data");
    });
    it("should call axios with correct params", async () => {
      const { sut } = makeSut();
      mockGetAxios.mockResolvedValue({
        data: "any_data",
        status: 200,
      });
      await sut.get("/any_endpoint", {
        body: "any_body",
        headers: {
          Authorization: "any_authorization",
          ContentType: "application/json",
        },
        params: {
          key: "any_key",
        },
      });
      expect(mockGetAxios).toHaveBeenCalledWith("/any_endpoint", {
        data: "any_body",
        headers: {
          Authorization: "any_authorization",
          "Content-Type": "application/json",
        },
        params: {
          key: "any_key",
        },
      });
    });
  });
});
