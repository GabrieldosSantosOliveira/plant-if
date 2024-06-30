import { randomUUID } from "crypto";
import { GeneratorUUID } from "../../../domain/contracts/gateways/uuid/generator-uuid";

export class GeneratorUUIDImpl implements GeneratorUUID {
  randomUUID(): string {
    return randomUUID();
  }
}
