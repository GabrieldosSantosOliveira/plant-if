import { User } from '@/app/entities/user'

export interface LoadUserByEmailRepository {
  findByEmail(email: string): Promise<User | null>
}
