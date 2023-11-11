import { SpeakeasyAdapter } from '@/infra/cryptography/speakeasy-adapter'

export const makeTimeBasedOneTimePassword = () => new SpeakeasyAdapter()
