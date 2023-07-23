import { HttpClient } from '@/data/protocols/http/http-client'
import { FetchHttpAdapter } from '@/infra/http/fetch-http-adapter'
import { JsonValidatorAdapter } from '@/infra/validators/json-validator-adapter'
import { createContext, FC, ReactNode } from 'react'
export interface HttpClientContextProps {
  httpClient: HttpClient
}
export const HttpClientContext = createContext<HttpClientContextProps>(
  {} as HttpClientContextProps,
)
export interface HttpClientProviderProps {
  children: ReactNode
}
export const HttpClientProvider: FC<HttpClientProviderProps> = ({
  children,
}) => {
  const httpClient = new FetchHttpAdapter(new JsonValidatorAdapter())
  return (
    <HttpClientContext.Provider value={{ httpClient }}>
      {children}
    </HttpClientContext.Provider>
  )
}
