import { InputProvider } from '@/ui/contexts/input-context'
import { useInput } from '@/ui/hooks/use-input'
import { memo } from 'react'

import { Box, BoxProps } from '../../../../components/shared/box'
import { Text } from '../../../../components/shared/text'

export type RootProps = BoxProps & {
  errorMessage?: string
  label?: string
}
export const RootBase: React.FC<RootProps> = (props: RootProps) => {
  const { isFocus } = useInput()
  return (
    <Box gap="xs">
      {props.label ? <Text variant="input-label">{props.label}</Text> : null}
      <Box
        borderColor={props.errorMessage ? 'error' : 'input-stroke'}
        borderWidth={isFocus ? 2 : 1}
        height={52}
        gap="md"
        paddingHorizontal="md"
        borderRadius="rounded-lg"
        flexDirection="row"
        alignItems="center"
        {...props}
      />
      {props.errorMessage ? (
        <Text variant="error">{props.errorMessage}</Text>
      ) : null}
    </Box>
  )
}
export const Root = memo((props: RootProps) => {
  return (
    <InputProvider>
      <RootBase {...props} />
    </InputProvider>
  )
})
