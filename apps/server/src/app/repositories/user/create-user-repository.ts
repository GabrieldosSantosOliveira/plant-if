import { User } from '@/app/entities/user'

export interface CreateUserRepository {
  create(user: User): Promise<void>
}
