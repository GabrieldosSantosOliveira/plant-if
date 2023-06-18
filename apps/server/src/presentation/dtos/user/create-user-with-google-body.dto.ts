import { IsString, IsNotEmpty } from 'class-validator'
export interface CreateUserWithGoogleBodyDtoParams {
  accessToken: string
}
export class CreateUserWithGoogleBodyDto {
  constructor({ accessToken }: CreateUserWithGoogleBodyDtoParams) {
    this.accessToken = accessToken
  }

  @IsString()
  @IsNotEmpty()
  accessToken: string
}
