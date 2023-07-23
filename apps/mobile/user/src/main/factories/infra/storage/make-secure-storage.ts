import { ExpoSecureStorageAdapter } from '@/infra/storage/expo-secure-storage-adapter'

export const MakeSecureStorage = () => new ExpoSecureStorageAdapter()
