import { SecureStorage } from '@/data/protocols/storage/secure-storage'
import { Storage } from '@/data/protocols/storage/storage'
import { JSONAdapter } from '@/infra/json/json-adapter'
import { ExpoSecureStorageAdapter } from '@/infra/storage/expo-secure-storage-adapter'
import { ReactNativeMMKVAdapter } from '@/infra/storage/react-native-mmkv-adapter'
import { createContext, ReactNode, FC } from 'react'
export interface StorageContextProps {
  storage: Storage
  secureStorage: SecureStorage
}
export const StorageContext = createContext<StorageContextProps>(
  {} as StorageContextProps,
)
export interface StorageProviderProps {
  children: ReactNode
}
export const StorageProvider: FC<StorageProviderProps> = ({ children }) => {
  const secureStorage = new ExpoSecureStorageAdapter(new JSONAdapter())
  const storage = new ReactNativeMMKVAdapter(new JSONAdapter())
  return (
    <StorageContext.Provider value={{ secureStorage, storage }}>
      {children}
    </StorageContext.Provider>
  )
}
