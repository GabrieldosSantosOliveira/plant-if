export interface TimeBasedOnTimePassword {
  generateSecret(): Promise<string>;
  generatePassword(secret: string, duration: number): Promise<string>;
  verify(secret: string, password: string, duration: number): Promise<boolean>;
}
