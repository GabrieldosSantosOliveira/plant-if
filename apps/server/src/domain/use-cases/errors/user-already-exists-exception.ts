import { DomainException } from "./domain-exception";

export class UserAlreadyExistsException extends DomainException {
  constructor() {
    super();
    this.name = "UserAlreadyExistsException";
  }
}
