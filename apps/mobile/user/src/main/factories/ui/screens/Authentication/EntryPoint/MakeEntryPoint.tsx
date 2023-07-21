import { MakeHttpClient } from '@/main/factories/infra/http/MakeHttpClient'
import { MakeSecureStorage } from '@/main/factories/infra/storage/MakeSecureStorage'
import { EntryPoint } from '@/ui/screens/Authentication/EntryPoint/EntryPoint'

export const MakeEntryPoint = () => {
  return (
    <EntryPoint
      httpClient={MakeHttpClient()}
      secureStorage={MakeSecureStorage()}
    />
  )
}
