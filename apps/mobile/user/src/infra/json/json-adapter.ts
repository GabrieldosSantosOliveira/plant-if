import { Json } from '@/data/protocols/json/json'

export class JSONAdapter implements Json {
  async parse<T = unknown>(text: string): Promise<T> {
    return JSON.parse(text)
  }

  async stringify(value: unknown): Promise<string> {
    return JSON.stringify(value)
  }
}
