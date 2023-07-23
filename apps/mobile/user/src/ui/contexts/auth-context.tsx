import { UserUiModel } from '@/domain/ui-model/user-ui-model'
import React, { createContext, ReactNode, FC, useState } from 'react'
export interface AuthContextProps {
  user: UserUiModel | null
  setUser: (user: UserUiModel | null) => void
}
export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps,
)
export interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserUiModel | null>(null)
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
