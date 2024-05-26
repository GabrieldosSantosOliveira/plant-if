import { Icons } from '@/ui/components/icons/icons';
import { RoundedIcon } from '@/ui/components/rounded-icon';
import { Box } from '@/ui/components/shared/box';
import { Text } from '@/ui/components/shared/text';
import { useTheme } from '@/ui/hooks/use-theme';
import { useNavigation } from '@react-navigation/native';

export const Header = () => {
  const { colors } = useTheme();
  const { goBack } = useNavigation();
  return (
    <Box>
      <RoundedIcon onPress={goBack} testID="button-go-back">
        <Icons.arrowLeft color={colors['text-primary']} />
      </RoundedIcon>
      <Text variant="heading">Esqueceu sua senha</Text>
    </Box>
  );
};
