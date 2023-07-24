import { IsUserAlreadyExistsUseCase } from '@/domain/use-cases/is-user-already-exists-use-case'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'

import { useToast } from './use-toast'

export interface UseIsUserAlreadyExistsProps {
  isUserAlreadyExistsUseCase: IsUserAlreadyExistsUseCase
}
export const useIsUserAlreadyExists = ({
  isUserAlreadyExistsUseCase,
}: UseIsUserAlreadyExistsProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const { navigate } = useNavigation()
  const execute = async (email: string) => {
    try {
      setIsLoading(true)
      const userExistsOrError = await isUserAlreadyExistsUseCase.execute(email)
      if (userExistsOrError.isLeft()) {
        toast.error({
          title: userExistsOrError.value.message,
        })
      }
      if (userExistsOrError.isRight()) {
        console.log(userExistsOrError.value)
        if (
          userExistsOrError.value.userExists === true &&
          userExistsOrError.value.provider
        ) {
          navigate('SingIn', {
            email,
            provider: userExistsOrError.value.provider,
          })
        } else {
          navigate('SingUp', { email })
        }
      }
    } finally {
      setIsLoading(false)
    }
  }
  return { execute, isLoading }
}
