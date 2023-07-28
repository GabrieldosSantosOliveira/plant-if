import { User } from '@/domain/entities/user'
import { User as RawUser } from '@prisma/client'
export class PrismaUserMapper {
  static toDomain(rawUser: RawUser): User {
    return new User({
      email: rawUser.email,
      firstName: rawUser.firstName,
      lastName: rawUser.lastName,
      createdAt: rawUser.createdAt,
      id: rawUser.id,
      image: rawUser.image || undefined,
      updatedAt: rawUser.updatedAt,
      password: rawUser.password || undefined,
      resetPasswordExpires: rawUser.resetPasswordExpires || undefined,
      resetPasswordToken: rawUser.resetPasswordToken || undefined,
    })
  }

  static toPrisma(user: User): RawUser {
    return {
      createdAt: user.createdAt,
      email: user.email,
      firstName: user.firstName,
      id: user.id,
      image: user.image || null,
      lastName: user.lastName,
      updatedAt: user.updatedAt,
      password: user.password || null,
      resetPasswordExpires: user.resetPasswordExpires || null,
      resetPasswordToken: user.resetPasswordToken || null,
    }
  }
}
