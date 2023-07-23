import { FetchHttpAdapter } from '@/infra/http/fetch-http-adapter'

import { MakeJsonValidator } from '../../validation/validations/make-json-validator'

export const MakeHttpClient = () => new FetchHttpAdapter(MakeJsonValidator())
