import { Exception } from './exception'

export class UserNotFoundException extends Error implements Exception {
  constructor() {
    super('Usuário não encontrado')
    this.name = 'UserNotFoundException'
  }
}
