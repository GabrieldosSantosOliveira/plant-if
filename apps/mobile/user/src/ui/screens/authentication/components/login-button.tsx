import { TouchableOpacity } from '@/ui/components/shared/touchable-opacity';
import { Theme } from '@/ui/styles/theme';
import { useTheme } from '@shopify/restyle';
import { ReactNode } from 'react';
import { AccessibilityProps, ActivityIndicator } from 'react-native';

export interface LoginButtonProps extends AccessibilityProps {
  icon: ReactNode;
  isLoading?: boolean;
  onPress: () => void;
  testID?: string;
}
export const LoginButton: React.FC<LoginButtonProps> = ({
  icon,
  onPress,
  isLoading = false,
  ...props
}) => {
  const { colors } = useTheme<Theme>();
  return (
    <TouchableOpacity
      testID="id-button"
      borderRadius="rounded-lg"
      disabled={isLoading}
      onPress={onPress}
      accessibilityRole="button"
      role="button"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      height={62}
      width={62}
      borderColor="social-stroke"
      borderWidth={1}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator
          testID="spinner"
          size="small"
          color={colors['text-primary']}
        />
      ) : (
        icon
      )}
    </TouchableOpacity>
  );
};
