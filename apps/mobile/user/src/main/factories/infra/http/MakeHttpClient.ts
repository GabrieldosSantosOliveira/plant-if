import { FetchHttpAdapter } from '@/infra/http/FetchHttpAdapter'

import { MakeJsonValidator } from '../../validation/validations/MakeJsonValidator'

export const MakeHttpClient = () => new FetchHttpAdapter(MakeJsonValidator())
