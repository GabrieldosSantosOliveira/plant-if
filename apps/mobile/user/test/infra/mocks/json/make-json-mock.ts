import { Json } from '@/data/protocols/json/json'

export class JsonMock implements Json {
  async parse<T = unknown>(text: string): Promise<T> {
    return JSON.parse(text)
  }

  async stringify(value: unknown): Promise<string> {
    return JSON.stringify(value)
  }
}
export const makeJsonMock = () => new JsonMock()
