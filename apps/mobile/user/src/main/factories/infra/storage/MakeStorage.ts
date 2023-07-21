import { StorageImpl } from '@/infra/storage/StorageImpl'

export const makeStorage = () => {
  return new StorageImpl()
}
