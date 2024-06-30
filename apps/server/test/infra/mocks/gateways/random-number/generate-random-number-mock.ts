import { GenerateRandomNumber } from "../../../../../src/domain/contracts/gateways/random-number/generate-random-number";

export class GenerateRandomNumberMock implements GenerateRandomNumber {
  public response = 999;
  async generate(): Promise<number> {
    return this.response;
  }
}
export const makeGenerateRandomNumberMock = () => {
  const generateRandomNumberMock = new GenerateRandomNumberMock();
  return { generateRandomNumberMock };
};
