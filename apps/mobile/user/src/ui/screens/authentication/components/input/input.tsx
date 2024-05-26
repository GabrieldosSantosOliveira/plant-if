import { TextInput, TextInputProps } from '@/ui/components/shared/text-input';
import { useInput } from '@/ui/hooks/use-input';
import { useTheme } from '@/ui/hooks/use-theme';
import { forwardRef } from 'react';
import { TextInput as RNTextInput } from 'react-native';
export type InputProps = TextInputProps;
export const Input = forwardRef<RNTextInput, TextInputProps>(
  ({ onFocus, onBlur, ...props }, ref) => {
    const { withFocus, withoutFocus } = useInput();
    const { colors } = useTheme();
    return (
      <TextInput
        flex={1}
        ref={ref}
        onFocus={(e) => {
          withFocus();
          if (onFocus) {
            onFocus(e);
          }
        }}
        onBlur={(e) => {
          withoutFocus();
          if (onBlur) {
            onBlur(e);
          }
        }}
        borderRadius="rounded-lg"
        variant="input"
        placeholderTextColor={colors['text-placeholder']}
        {...props}
      />
    );
  },
);
