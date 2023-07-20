import { JsonValidator } from '@/validation/protocols/JsonValidator'

export class JsonValidatorAdapter implements JsonValidator {
  isValidJSON(text: string): boolean {
    try {
      JSON.parse(text)
      return true
    } catch {
      return false
    }
  }
}
