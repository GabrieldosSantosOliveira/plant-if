export interface Json {
  parse<T = unknown>(text: string): Promise<T>;
  stringify(value: unknown): Promise<string>;
}
