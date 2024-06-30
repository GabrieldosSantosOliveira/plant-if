import { GenerateRandomNumber } from "../../../domain/contracts/gateways/random-number/generate-random-number";

export class GenerateRandomNumberImpl implements GenerateRandomNumber {
  async generate(length: number): Promise<number> {
    const min = Math.ceil(Math.pow(10, length - 1));
    const max = Math.floor(Number("9".repeat(length)));
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
