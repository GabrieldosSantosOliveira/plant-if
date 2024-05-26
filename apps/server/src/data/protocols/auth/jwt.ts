import { Either } from "@/shared/either";

export interface OptionsEncrypt {
  secret: string;
  expire: number;
}
export interface OptionsDecrypt {
  secret: string;
}
export interface Payload {
  sub: string;
  [key: string]: unknown;
}
export interface JwtResponse {
  success: boolean;
  payload: Payload | null;
}
export interface Jwt {
  encrypt(payload: Payload, options: OptionsEncrypt): Promise<string>;
  decrypt(
    encryptText: string,
    options: OptionsDecrypt,
  ): Promise<Either<Error, Payload>>;
}
