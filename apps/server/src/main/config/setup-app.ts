import cors from 'cors'
import express, { json } from 'express'

import { setupRoutes } from './setup-routes'
export async function setupApp() {
  const app = express()
  app.use(json())
  app.use(cors())
  await setupRoutes(app)
  return app
}
