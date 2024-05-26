import { UserUiModel } from '@/domain/ui-model/user-ui-model';
import { AuthRecoverySessionUseCase } from '@/domain/use-cases/auth-recovery-session-use-case';
import React, { createContext, ReactNode, useState, useEffect } from 'react';
export interface AuthContextProps {
  user: UserUiModel | null;
  setUser: (user: UserUiModel | null) => void;
}
export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps,
);
export interface AuthProviderProps {
  children: ReactNode;
  authRecoverySessionUseCase: AuthRecoverySessionUseCase;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserUiModel | null>(null);
  useEffect(() => {
    async function recoverySession() {}
    recoverySession();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
