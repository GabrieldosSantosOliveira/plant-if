import 'dotenv/config'
export const env = {
  APP_PORT: Number(process.env.APP_PORT) || 3000,
  SECRET_ACCESS_TOKEN: process.env.SECRET_ACCESS_TOKEN || 'SECRET_ACCESS_TOKEN',
  SECRET_REFRESH_TOKEN:
    process.env.SECRET_REFRESH_TOKEN || 'SECRET_REFRESH_TOKEN',
}
