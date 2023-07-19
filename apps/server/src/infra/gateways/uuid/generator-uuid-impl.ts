import { GeneratorUUID } from '@/domain/contracts/gateways/uuid/generator-uuid'
import { randomUUID } from 'crypto'

export class GeneratorUUIDImpl implements GeneratorUUID {
  randomUUID(): string {
    return randomUUID()
  }
}
