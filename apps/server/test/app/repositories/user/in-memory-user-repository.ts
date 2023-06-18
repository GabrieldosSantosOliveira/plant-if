import { User } from '@/app/entities/user'
import { CreateUserRepository } from '@/app/repositories/user/create-user-repository'
import { LoadUserByEmailRepository } from '@/app/repositories/user/load-user-by-email-repository'

export class InMemoryUserRepository
  implements LoadUserByEmailRepository, CreateUserRepository
{
  private users: User[] = []
  async findByEmail(email: string): Promise<User | null> {
    const userExists = this.users.find((user) => user.email === email)
    if (!userExists) {
      return null
    }
    return userExists
  }

  async create(user: User): Promise<void> {
    this.users.push(user)
  }
}
export const makeInMemoryUserRepository = () => {
  const inMemoryUserRepository = new InMemoryUserRepository()
  return { inMemoryUserRepository }
}
