import { Either } from "@/shared/either";

import { Payload } from "./jwt";

export interface AuthServiceAccessToken {
  accessToken: string;
}
export interface AuthServiceRefreshToken {
  refreshToken: string;
}
export interface AuthService {
  generateAccessToken(id: string): Promise<AuthServiceAccessToken>;
  generateRefreshToken(id: string): Promise<AuthServiceRefreshToken>;
  decryptAccessToken(accessToken: string): Promise<Either<Error, Payload>>;
  decryptRefreshToken(refreshToken: string): Promise<Either<Error, Payload>>;
}
