import * as bcrypt from "bcryptjs";
import { Bcrypt } from "../../data/protocols/cryptography/bcrypt";
export class BcryptAdapter implements Bcrypt {
  constructor(private readonly salt: number) {}
  async compare(plaintext: string, digest: string): Promise<boolean> {
    return bcrypt.compare(plaintext, digest);
  }

  async hash(plaintext: string): Promise<string> {
    return bcrypt.hash(plaintext, this.salt);
  }
}
