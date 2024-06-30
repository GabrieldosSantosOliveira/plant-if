import { GeneratorUUID } from "../../../../../src/domain/contracts/gateways/uuid/generator-uuid";
import { mockValues } from "../../../../mock/mock-values";

export class GeneratorUUIDMock implements GeneratorUUID {
  randomUUID(): string {
    return mockValues.uuid;
  }
}

export const makeGeneratorUUIDMock = () => {
  const generatorUUIDMock = new GeneratorUUIDMock();
  return { generatorUUIDMock };
};
