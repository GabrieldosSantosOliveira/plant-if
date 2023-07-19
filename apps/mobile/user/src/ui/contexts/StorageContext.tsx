import { SecureStorageImpl } from '@/infra/storage/SecureStorageImpl'
import { StorageImpl } from '@/infra/storage/StorageImpl'
import { SecureStorage } from '@/interfaces/storage/SecureStorage'
import { Storage } from '@/interfaces/storage/Storage'
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
  const secureStorage = new SecureStorageImpl()
  const storage = new StorageImpl()
  return (
    <StorageContext.Provider value={{ secureStorage, storage }}>
      {children}
    </StorageContext.Provider>
  )
}
