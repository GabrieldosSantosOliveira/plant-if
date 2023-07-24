import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter'

export const makeHasher = () => new BcryptAdapter(12)
