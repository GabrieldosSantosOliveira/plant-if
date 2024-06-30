import { DomainException } from "./domain-exception";

export class UserNotFoundException extends DomainException {
  constructor() {
    super();
    this.name = "UserNotFoundException";
  }
}
