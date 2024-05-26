import { Exception } from './exception';

export class AccessDeniedException extends Error implements Exception {
  constructor() {
    super('Acesso negado!');
    this.name = 'AccessDeniedException';
  }
}
