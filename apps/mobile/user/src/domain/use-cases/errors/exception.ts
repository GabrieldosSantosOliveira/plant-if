export const enum ExceptionType {
  INTERNET,
  ANOTHER,
}
export interface Exception {
  message: string
  type: ExceptionType
}
