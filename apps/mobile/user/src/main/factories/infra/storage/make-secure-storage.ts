import { ExpoSecureStorageAdapter } from '@/infra/storage/expo-secure-storage-adapter'

import { MakeJson } from '../json/make-json'

export const MakeSecureStorage = () => new ExpoSecureStorageAdapter(MakeJson())
