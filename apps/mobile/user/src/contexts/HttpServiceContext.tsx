import { HttpServiceImpl } from '@/infra/http/HttpServiceImpl'
import { HttpService } from '@/interfaces/http/HttpService'
import { createContext, FC, ReactNode } from 'react'
export interface HttpServiceContextProps {
  httpService: HttpService
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
  const httpService = new HttpServiceImpl()
  return (
    <HttpServiceContext.Provider value={{ httpService }}>
      {children}
    </HttpServiceContext.Provider>
  )
}
