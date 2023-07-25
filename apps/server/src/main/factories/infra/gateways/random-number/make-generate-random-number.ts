import { GenerateRandomNumberImpl } from '@/infra/gateways/random-number/generate-random-number-impl'

export const makeGenerateRandomNumber = () => new GenerateRandomNumberImpl()
