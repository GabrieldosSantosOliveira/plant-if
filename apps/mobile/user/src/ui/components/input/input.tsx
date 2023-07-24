import { TextInput, TextInputProps } from '@/ui/components/shared/text-input'
import { useInput } from '@/ui/hooks/use-input'
import React from 'react'
export type InputProps = TextInputProps
export const Input: React.FC<InputProps> = ({ onFocus, onBlur, ...props }) => {
  const { withFocus, withoutFocus } = useInput()
  return (
    <TextInput
      flex={1}
      onFocus={(e) => {
        withFocus()
        if (onFocus) {
          onFocus(e)
        }
      }}
      onBlur={(e) => {
        withoutFocus()
        if (onBlur) {
          onBlur(e)
        }
      }}
      borderRadius="rounded-lg"
      paddingHorizontal="md"
      variant="input"
      {...props}
    />
  )
}
