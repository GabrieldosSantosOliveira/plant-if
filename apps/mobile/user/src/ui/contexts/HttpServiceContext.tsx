import { FetchHttpAdapter } from '@/infra/http/FetchHttpAdapter'
import { JsonValidatorAdapter } from '@/infra/validators/JsonValidatorAdapter'
import { HttpClient } from '@/interfaces/http/HttpClient'
import { createContext, FC, ReactNode } from 'react'
export interface HttpServiceContextProps {
  httpClient: HttpClient
}
export const HttpServiceContext = createContext<HttpServiceContextProps>(
  {} as HttpServiceContextProps,
)
export interface HttpServiceProviderProps {
  children: ReactNode
}
export const HttpServiceProvider: FC<HttpServiceProviderProps> = ({
  children,
}) => {
  const httpClient = new FetchHttpAdapter(new JsonValidatorAdapter())
  return (
    <HttpServiceContext.Provider value={{ httpClient }}>
      {children}
    </HttpServiceContext.Provider>
  )
}
