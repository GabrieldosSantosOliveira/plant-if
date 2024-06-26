export interface Bcrypt {
  compare(plaintext: string, digest: string): Promise<boolean>;
  hash(plaintext: string): Promise<string>;
}
