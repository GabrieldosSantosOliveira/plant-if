import { HashComparer } from "@/data/protocols/cryptography/hash-comparer";
import { Hasher } from "@/data/protocols/cryptography/hasher";
import * as bcrypt from "bcryptjs";
export class BcryptAdapter implements Hasher, HashComparer {
  constructor(private readonly salt: number) {}
  async compare(plaintext: string, digest: string): Promise<boolean> {
    return bcrypt.compare(plaintext, digest);
  }

  async hash(plaintext: string): Promise<string> {
    return bcrypt.hash(plaintext, this.salt);
  }
}
