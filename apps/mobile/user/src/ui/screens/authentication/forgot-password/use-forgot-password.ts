import { AuthRoutes } from '@/@types/navigation'
import { UnexpectedException } from '@/domain/use-cases/errors/unexpected-exception'
import { ForgotPasswordUseCase } from '@/domain/use-cases/forgot-password-use-case'
import { useToast } from '@/ui/hooks/use-toast'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { useState } from 'react'

export interface UseForgotPassword {
  forgotPasswordUseCase: ForgotPasswordUseCase
}
export const useForgotPassword = ({
  forgotPasswordUseCase,
}: UseForgotPassword) => {
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const { navigate } = useNavigation<NavigationProp<AuthRoutes>>()
  const execute = async (email: string) => {
    try {
      setIsLoading(true)
      const successOrFails = await forgotPasswordUseCase.execute({ email })
      if (successOrFails.isLeft()) {
        return toast.error({
          title: successOrFails.value.message,
        })
      }
      if (successOrFails.isRight()) {
        return navigate('reset-password', { email })
      }
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
