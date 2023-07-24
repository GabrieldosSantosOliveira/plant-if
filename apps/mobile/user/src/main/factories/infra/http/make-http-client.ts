import { FetchHttpAdapter } from '@/infra/http/fetch-http-adapter'

import { MakeJsonValidator } from '../../validation/validations/make-json-validator'
import { MakeJson } from '../json/make-json'

export const MakeHttpClient = () =>
  new FetchHttpAdapter(MakeJsonValidator(), MakeJson())
