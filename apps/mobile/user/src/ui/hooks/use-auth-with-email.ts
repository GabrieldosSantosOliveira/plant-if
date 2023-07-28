import { AuthWithEmailUseCase } from '@/domain/use-cases/auth-with-email-use-case'
import { useState } from 'react'

import { useAuth } from './use-auth'
import { useToast } from './use-toast'

export interface UseAuthWithEmailProps {
  authWithEmailUseCase: AuthWithEmailUseCase
}
export interface UseAuthWithEmailExecute {
  email: string
  password: string
}

export const useAuthWithEmail = ({
  authWithEmailUseCase,
}: UseAuthWithEmailProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { setUser } = useAuth()
  const toast = useToast()
  const execute = async ({ email, password }: UseAuthWithEmailExecute) => {
    try {
      setIsLoading(true)
      const userOrError = await authWithEmailUseCase.execute({
        email,
        password,
      })
      if (userOrError.isRight()) {
        setUser(userOrError.value)
      }
      if (userOrError.isLeft()) {
        toast.error({
          title: userOrError.value.message,
        })
      }
    } finally {
      setIsLoading(false)
    }
  }
  return { execute, isLoading }
}
