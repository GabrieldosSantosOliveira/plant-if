import { SecureStorage } from '@/data/protocols/storage/secure-storage';
export interface Item {
  key: string;
  value: string;
}
export class SecureStorageMock implements SecureStorage {
  private items: Item[] = [];
  async getItem<T = unknown>(key: string): Promise<T | null> {
    const indexItem = this.items.findIndex((item) => item.key === key);
    if (indexItem < 0) {
      return null;
    }
    const item = this.items[indexItem];
    if (!item) {
      return null;
    }
    return JSON.parse(item.value);
  }

  async setItem<T = unknown>(key: string, value: T): Promise<void> {
    this.items.push({
      key,
      value: JSON.stringify(value),
    });
  }

  async removeItem(key: string): Promise<void> {
    const indexItem = this.items.findIndex((item) => item.key === key);
    this.items.splice(indexItem, 1);
  }
}
export const makeSecureStorageMock = () => {
  const secureStorageMock = new SecureStorageMock();
  return { secureStorageMock };
};
