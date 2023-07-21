import { SecureStorageImpl } from '@/infra/storage/SecureStorageImpl'

export const MakeSecureStorage = () => new SecureStorageImpl()
