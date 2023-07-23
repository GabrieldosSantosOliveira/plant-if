import { SecureStorage } from '@/data/protocols/storage/secure-storage'
import * as SecureStore from 'expo-secure-store'
export class ExpoSecureStorageAdapter implements SecureStorage {
  async getItem<T = unknown>(key: string): Promise<T | null> {
    const item = await SecureStore.getItemAsync(key)
    if (!item) return null
    return JSON.parse(item)
  }

  async setItem<T = unknown>(key: string, value: T): Promise<void> {
    await SecureStore.setItemAsync(key, JSON.stringify(value))
  }

  async removeItem(key: string): Promise<void> {
    await SecureStore.deleteItemAsync(key)
  }
}
