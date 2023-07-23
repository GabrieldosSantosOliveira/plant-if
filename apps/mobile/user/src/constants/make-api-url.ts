import { env } from './env'

export const makeApiUrl = (url: string) => new URL(url, env.BASE_URL).toString()
