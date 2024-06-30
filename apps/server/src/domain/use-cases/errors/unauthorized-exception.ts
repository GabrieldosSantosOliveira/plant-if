import { DomainException } from "./domain-exception";

export class UnauthorizedException extends DomainException {
  constructor() {
    super();
    this.name = "UnauthorizedException";
  }
}
