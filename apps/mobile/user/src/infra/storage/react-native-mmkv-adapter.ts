import { Json } from '@/data/protocols/json/json';
import { Storage } from '@/data/protocols/storage/storage';
import { MMKV } from 'react-native-mmkv';
const storage = new MMKV();
export class ReactNativeMMKVAdapter implements Storage {
  constructor(private readonly json: Json) {}
  async getItem<T = unknown>(key: string): Promise<T | null> {
    const item = storage.getString(key);
    if (!item) {
      return null;
    }
    return this.json.parse(item);
  }

  async setItem<T = unknown>(key: string, value: T): Promise<void> {
    return storage.set(key, await this.json.stringify(value));
  }

  async removeItem(key: string): Promise<void> {
    return storage.delete(key);
  }
}
