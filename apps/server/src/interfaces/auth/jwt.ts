export interface Payload {
  sub: string
}
export interface OptionsEncrypt {
  secret: string
  expire: number
}
export interface OptionsDecrypt {
  secret: string
}
export interface Jwt {
  encrypt(identifier: string, options: OptionsEncrypt): Promise<string>
  decrypt(encryptText: string, options: OptionsDecrypt): Promise<Payload>
  decode<T = any>(token: string): Promise<T | null>
}
