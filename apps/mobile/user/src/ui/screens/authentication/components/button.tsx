import { Box } from '@/ui/components/shared/box';
import { Text } from '@/ui/components/shared/text';
import { TouchableOpacity } from '@/ui/components/shared/touchable-opacity';
import { useTheme } from '@/ui/hooks/use-theme';
import React from 'react';
import { AccessibilityProps, ActivityIndicator } from 'react-native';
export interface ButtonProps extends AccessibilityProps {
  onPress: () => void;
  title: string;
  type?: 'default' | 'primary';
  isLoading?: boolean;
  testID?: string;
}
export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  type = 'default',
  isLoading = false,
  ...props
}) => {
  const { colors } = useTheme();
  const colorKey = type === 'default' ? 'text-primary' : 'text-secondary';
  const color = colors[colorKey];
  return (
    <TouchableOpacity
      disabled={isLoading}
      role="button"
      testID="id-button"
      accessibilityRole="button"
      onPress={onPress}
      height={52}
      width="100%"
      borderRadius="rounded-lg"
      borderWidth={1}
      borderColor={colorKey}
      backgroundColor={type === 'default' ? 'main-background' : 'text-primary'}
      {...props}
    >
      <Box justifyContent="center" alignItems="center" flex={1}>
        {isLoading ? (
          <ActivityIndicator
            testID="activity-indicator"
            color={color}
            size="small"
          />
        ) : (
          <Text variant="button" color={colorKey}>
            {title}
          </Text>
        )}
      </Box>
    </TouchableOpacity>
  );
};
