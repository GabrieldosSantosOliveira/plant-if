import { InputProvider } from '@/ui/contexts/input-context'
import { useInput } from '@/ui/hooks/use-input'
import { memo } from 'react'

import { Text } from '../shared/text'
import { View, ViewProps } from '../shared/view'

export type RootProps = ViewProps & {
  errorMessage?: string
}
export const RootBase: React.FC<RootProps> = (props: RootProps) => {
  const { isFocus } = useInput()
  return (
    <>
      <View
        borderColor={props.errorMessage ? 'error' : 'button-border'}
        borderWidth={isFocus ? 2 : 1}
        height={52}
        gap="2xs"
        paddingHorizontal="md"
        borderRadius="rounded-lg"
        flexDirection="row"
        alignItems="center"
        {...props}
      />
      {props.errorMessage ? (
        <Text variant="error">{props.errorMessage}</Text>
      ) : null}
    </>
  )
}
export const Root = memo((props: RootProps) => {
  return (
    <InputProvider>
      <RootBase {...props} />
    </InputProvider>
  )
})
