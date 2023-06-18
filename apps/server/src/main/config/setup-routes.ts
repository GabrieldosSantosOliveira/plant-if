import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import { resolve } from 'path'
const router = Router()
export async function setupRoutes(app: Express) {
  app.use('/api', router)
  const filenames = readdirSync(resolve(__dirname, '..', 'routes'))
  for (const file of filenames) {
    const route = await import(`../routes/${file}`)
    route.default(router)
  }
}
