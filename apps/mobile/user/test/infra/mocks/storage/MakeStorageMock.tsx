import { StorageImpl } from '@/infra/storage/StorageImpl'

export const MakeStorageMock = () => {
  return new StorageImpl()
}
