export interface GenerateRandomNumber {
  generate(length: number): Promise<number>
}
