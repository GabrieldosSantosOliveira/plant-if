import { UnexpectedException } from '@/domain/use-cases/errors/unexpected-exception'
import { SingUpWithEmailUseCase } from '@/domain/use-cases/sing-up-with-email-use-case'
import { useAuth } from '@/ui/hooks/use-auth'
import { useToast } from '@/ui/hooks/use-toast'
import { useState } from 'react'
export interface UseSingUpWithEmailParams {
  singUpWithEmailUseCase: SingUpWithEmailUseCase
}
export interface UseSingUpWithEmailDto {
  firstName: string
  lastName: string
  email: string
  password: string
}
export const useSingUpWithEmail = ({
  singUpWithEmailUseCase,
}: UseSingUpWithEmailParams) => {
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const { setUser } = useAuth()
  const execute = async ({
    email,
    firstName,
    lastName,
    password,
  }: UseSingUpWithEmailDto) => {
    try {
      setIsLoading(true)
      const successOrFails = await singUpWithEmailUseCase.execute({
        email,
        firstName,
        lastName,
        password,
      })
      if (successOrFails.isLeft()) {
        return toast.error({
          title: successOrFails.value.message,
        })
      }
      setUser(successOrFails.value)
    } catch {
      return toast.error({
        title: new UnexpectedException().message,
      })
    } finally {
      setIsLoading(false)
    }
  }
  return { execute, isLoading }
}
