import { Either } from "@/shared/either";

import { Exception } from "../errors/exception";

export interface RefreshTokenUseCaseRequestDto {
  refreshToken: string;
}
export interface RefreshTokenUseCaseResponseDto {
  accessToken: string;
}
export interface RefreshTokenUseCase {
  handle({
    refreshToken,
  }: RefreshTokenUseCaseRequestDto): Promise<
    Either<Exception, RefreshTokenUseCaseResponseDto>
  >;
}
