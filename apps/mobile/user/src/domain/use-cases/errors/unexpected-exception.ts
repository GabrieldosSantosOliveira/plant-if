import { Exception } from '@/domain/use-cases/errors/exception'

export class UnexpectedException extends Error implements Exception {
  constructor() {
    super('Algo de errado ocorreu, tente novamente mais tarde')
    this.name = 'UnexpectedException'
  }
}
