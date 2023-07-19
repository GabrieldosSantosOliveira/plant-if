import { GeneratorUUID } from '@/domain/contracts/gateways/uuid/generator-uuid'
import { faker } from '@faker-js/faker'
export class GeneratorUUIDMock implements GeneratorUUID {
  randomUUID(): string {
    return faker.string.uuid()
  }
}

export const makeGeneratorUUID = () => new GeneratorUUIDMock()
