import { AuthWithFacebookUseCase } from '@/domain/use-cases/auth-with-facebook-use-case'
import { AuthWithGoogleUseCase } from '@/domain/use-cases/auth-with-google-use-case'
import { IsUserAlreadyExistsUseCase } from '@/domain/use-cases/is-user-already-exists-use-case'
import { Icons } from '@/ui/components/icons/icons'
import { ControlledInput } from '@/ui/components/input/controlled-input'
import { Root } from '@/ui/components/input/root'
import { Box } from '@/ui/components/shared/box'
import { Text } from '@/ui/components/shared/text'
import { useAuthWithFacebook } from '@/ui/hooks/use-auth-with-facebook'
import { useAuthWithGoogle } from '@/ui/hooks/use-auth-with-google'
import { useIsUserAlreadyExists } from '@/ui/hooks/use-is-user-already-exists'
import { yupResolver } from '@hookform/resolvers/yup'
import { useId } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { LoginButton } from '../components/login-button'
import { Button } from './../components/button'
import { Header } from './header'
export interface EntryPointProps {
  authWithFacebookUseCase: AuthWithFacebookUseCase
  authWithGoogleUseCase: AuthWithGoogleUseCase
  isUserAlreadyExistsUseCase: IsUserAlreadyExistsUseCase
}
export interface EntryPointForm {
  email: string
}
const schema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Informe um email válido')
    .required('Informe um email'),
})
export const EntryPoint: React.FC<EntryPointProps> = ({
  authWithFacebookUseCase,
  authWithGoogleUseCase,
  isUserAlreadyExistsUseCase,
}) => {
  const isUserAlreadyExists = useIsUserAlreadyExists({
    isUserAlreadyExistsUseCase,
  })
  const authWithGoogle = useAuthWithGoogle({
    authWithGoogleUseCase,
  })

  const authWithFacebook = useAuthWithFacebook({
    authWithFacebookUseCase,
  })
  const emailID = useId()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EntryPointForm>({
    defaultValues: { email: '' },
    resolver: yupResolver(schema),
    reValidateMode: 'onChange',
  })
  const onSubmit = async ({ email }: EntryPointForm) => {
    await isUserAlreadyExists.execute(email)
  }
  return (
    <Box
      flex={1}
      backgroundColor="main-background"
      paddingVertical="lg"
      paddingHorizontal="2xl"
      gap="md"
    >
      <Header />
      <Text variant="input-label" nativeID={emailID}>
        Email
      </Text>
      <Root errorMessage={errors.email?.message}>
        <Icons.email color="black" />
        <ControlledInput
          control={control}
          name="email"
          autoComplete="email"
          keyboardType="email-address"
          onChangeTextFormat={(text) => text.trim()}
          placeholder="Informe o seu email"
          accessibilityLabelledBy={emailID}
          aria-labelledby={emailID}
        />
        {errors.email?.message ? <Icons.errorOutline color="red" /> : null}
      </Root>
      <Button
        testID="button-submit"
        title="Continuar"
        type="primary"
        accessibilityLabel="Entrar na aplicação usando email"
        accessibilityHint="Verifica se já possui conta"
        onPress={handleSubmit(onSubmit)}
        isLoading={isUserAlreadyExists.isLoading}
        aria-disabled={isUserAlreadyExists.isLoading}
        accessibilityValue={{
          text: isUserAlreadyExists.isLoading
            ? 'Verificando se usuário já existe'
            : 'Botão disponível novamente',
        }}
      />
      <Box gap="xl">
        <Box
          width="100%"
          flexDirection="row"
          alignItems="center"
          gap="md"
          opacity={0.4}
        >
          <Box flex={1} height={1} backgroundColor="text-primary" />
          <Text>ou</Text>
          <Box flex={1} height={1} backgroundColor="text-primary" />
        </Box>

        <LoginButton
          testID="button-login-facebook"
          icon={<Icons.facebook />}
          title="Continuar com Facebook"
          accessibilityHint="Cadastrar utilizando o facebook"
          onPress={authWithFacebook.promptAsync}
          isLoading={authWithFacebook.isLoading}
        />
        <LoginButton
          testID="button-login-google"
          icon={<Icons.google />}
          title="Continuar com Google"
          accessibilityHint="Cadastrar utilizando o google"
          onPress={authWithGoogle.promptAsync}
          isLoading={authWithGoogle.isLoading}
        />
      </Box>
    </Box>
  )
}
