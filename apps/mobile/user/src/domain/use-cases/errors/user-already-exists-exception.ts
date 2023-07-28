import { Exception } from './exception'

export class UserAlreadyExistsException extends Error implements Exception {
  constructor() {
    super('Usuário já existe')
    this.name = 'UserAlreadyExistsException'
  }
}
