import { Box } from '@/ui/components/shared/box';
import { Text } from '@/ui/components/shared/text';
import { TouchableOpacity } from '@/ui/components/shared/touchable-opacity';
import { useNavigation } from '@react-navigation/native';

export const NoHaveAccount = () => {
  const { navigate } = useNavigation();
  return (
    <TouchableOpacity
      testID="button-sing-up"
      accessibilityRole="button"
      alignItems="center"
      onPress={() => navigate('sing-up')}
    >
      <Box flexDirection="row" gap="xs">
        <Text variant="text-placeholder">Não tem uma conta?</Text>
        <Text variant="text-placeholder" color="attention">
          Cadastre-se
        </Text>
      </Box>
    </TouchableOpacity>
  );
};
