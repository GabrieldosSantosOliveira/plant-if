import { IsString, IsNotEmpty } from 'class-validator'
export interface CreateUserWithFacebookBodyDtoParams {
  accessToken: string
}
export class CreateUserWithFacebookBodyDto {
  constructor({ accessToken }: CreateUserWithFacebookBodyDtoParams) {
    this.accessToken = accessToken
  }

  @IsString()
  @IsNotEmpty()
  accessToken: string
}
