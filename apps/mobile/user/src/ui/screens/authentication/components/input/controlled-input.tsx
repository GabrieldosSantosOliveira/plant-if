import { Controller, UseControllerProps, FieldValues } from 'react-hook-form';

import { Input, InputProps } from './input';
export type ControlledInputProps<T extends FieldValues> = InputProps &
  UseControllerProps<T> & {
    onChangeTextFormat?: (text: string) => string;
  };
export function ControlledInput<FormType extends FieldValues>({
  control,
  defaultValue,
  name,
  rules,
  shouldUnregister,
  onBlur,
  onChangeText,
  onChangeTextFormat,
  ...props
}: ControlledInputProps<FormType>) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      shouldUnregister={shouldUnregister}
      render={({ field }) => (
        <Input
          onBlur={(e) => {
            field.onBlur();
            if (onBlur) {
              onBlur(e);
            }
          }}
          onChangeText={(text) => {
            if (onChangeTextFormat) {
              field.onChange(onChangeTextFormat(text));
            } else {
              field.onChange(text);
            }
            if (onChangeText) {
              onChangeText(text);
            }
          }}
          value={field.value}
          {...props}
        />
      )}
    />
  );
}
