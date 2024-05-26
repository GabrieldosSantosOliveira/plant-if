import { UserUiModel } from '@/domain/ui-model/user-ui-model';

import { UserDto } from '../dtos/user-dto';

export class UserMapper {
  static toUI(userDto: UserDto): UserUiModel {
    return new UserUiModel({
      id: userDto.id,
      createdAt: userDto.createdAt,
      email: userDto.email,
      firstName: userDto.firstName,
      lastName: userDto.lastName,
      updatedAt: userDto.updatedAt,
    });
  }
}
