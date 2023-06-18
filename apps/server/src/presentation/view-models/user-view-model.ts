import { User } from '@/app/entities/user'

export class UserViewModel {
  static toHTTP(user: User) {
    return {
      id: user.id,
      lastName: user.lastName,
      firstName: user.firstName,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}
