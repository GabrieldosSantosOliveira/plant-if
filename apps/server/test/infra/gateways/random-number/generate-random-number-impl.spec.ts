import { GenerateRandomNumberImpl } from "../../../../src/infra/gateways/random-number/generate-random-number-impl";

const makeSut = () => {
  const sut = new GenerateRandomNumberImpl();
  return { sut };
};
describe("GenerateRandomNumberImpl", () => {
  it("should return number with correct length", async () => {
    const { sut } = makeSut();
    const response = await sut.generate(10);
    expect(String(response).length).toBe(10);
  });
  it("should return random numbers", async () => {
    const { sut } = makeSut();
    const randomNumber1 = await sut.generate(10);
    const randomNumber2 = await sut.generate(10);
    expect(randomNumber1).not.toEqual(randomNumber2);
  });
});
