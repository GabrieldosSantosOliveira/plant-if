import { Storage } from '@/interfaces/storage/Storage'
import { MMKV } from 'react-native-mmkv'
const storage = new MMKV()
export class StorageImpl implements Storage {
  async getItem<T = unknown>(key: string): Promise<T | null> {
    const item = storage.getString(key)
    if (!item) return null
    return JSON.parse(item)
  }

  async setItem<T = unknown>(key: string, value: T): Promise<void> {
    return storage.set(key, JSON.stringify(value))
  }

  async removeItem(key: string): Promise<void> {
    return storage.delete(key)
  }
}
