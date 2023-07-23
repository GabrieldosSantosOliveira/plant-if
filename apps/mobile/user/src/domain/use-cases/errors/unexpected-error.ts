import { Exception, ExceptionType } from '@/domain/use-cases/errors/exception'

export class UnexpectedError extends Error implements Exception {
  constructor() {
    super('Algo de errado ocorreu, tente novamente mais tarde')
    this.name = 'UnexpectedError'
  }

  public get type(): ExceptionType {
    return ExceptionType.ANOTHER
  }
}
