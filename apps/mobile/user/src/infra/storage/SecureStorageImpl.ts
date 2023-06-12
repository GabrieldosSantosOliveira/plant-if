import { SecureStorage } from '@/interfaces/storage/SecureStorage'
import * as SecureStore from 'expo-secure-store'
export class SecureStorageImpl implements SecureStorage {
  async getItem<T = any>(key: string): Promise<T | null> {
    const item = await SecureStore.getItemAsync(key)
    if (!item) return null
    return JSON.parse(item)
  }

  async setItem<T = any>(key: string, value: T): Promise<void> {
    await SecureStore.setItemAsync(key, JSON.stringify(value))
  }

  async removeItem(key: string): Promise<void> {
    await SecureStore.deleteItemAsync(key)
  }
}
