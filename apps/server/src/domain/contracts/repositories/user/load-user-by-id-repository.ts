import { User } from '@/domain/entities/user'

export interface LoadUserByIdRepository {
  findById(id: string): Promise<User | null>
}
