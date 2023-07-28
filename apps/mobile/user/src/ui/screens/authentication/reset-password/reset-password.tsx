import { AuthRoutes } from '@/@types/navigation'
import { Icons } from '@/ui/components/icons/icons'
import { Box } from '@/ui/components/shared/box'
import { Text } from '@/ui/components/shared/text'
import { TouchableOpacity } from '@/ui/components/shared/touchable-opacity'
import { useTheme } from '@/ui/hooks/use-theme'
import { RouteProp, useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '../components/button'
import { ControlledInput } from '../components/input/controlled-input'
import { Root } from '../components/input/root'
import { Header } from './header'
export interface ResetPasswordForm {
  code: string
  passwordReset: string
}
type ResetPasswordParam = Pick<AuthRoutes, 'reset-password'>
export const ResetPassword = () => {
  const {
    control,
    formState: { errors },
  } = useForm<ResetPasswordForm>()
  const [showPassword, setShowPassword] = useState(false)
  const { params } = useRoute<RouteProp<ResetPasswordParam>>()
  const { colors } = useTheme()
  return (
    <Box
      flex={1}
      gap="md"
      backgroundColor="main-background"
      paddingHorizontal="2xl"
    >
      <Header />
      <Text variant="input-label" textAlign="center">
        Insira o código de 6 dígitos enviado ao seu email {params.email}
      </Text>
      <Root errorMessage={errors.code?.message} label="Código">
        <ControlledInput
          placeholder="Código"
          keyboardType="numeric"
          control={control}
          name="code"
        />
      </Root>
      <Root errorMessage={errors.passwordReset?.message} label="Senha">
        <Icons.lock color={colors['icon-main']} />
        <ControlledInput
          testID="input-password"
          control={control}
          name="passwordReset"
          placeholder="Informe sua senha"
          secureTextEntry={!showPassword}
          autoComplete="current-password"
        />
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <Icons.eye color={colors['icon-main']} />
          ) : (
            <Icons.eyeOff color={colors['icon-main']} />
          )}
        </TouchableOpacity>
      </Root>
      <Button type="primary" title="Alterar Senha" onPress={console.log} />
    </Box>
  )
}
