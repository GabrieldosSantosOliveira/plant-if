import { Icons } from '@/ui/components/icons/icons';
import { RoundedIcon } from '@/ui/components/rounded-icon';
import { Box } from '@/ui/components/shared/box';
import { Text } from '@/ui/components/shared/text';
import { useTheme } from '@/ui/hooks/use-theme';
import { useNavigation } from '@react-navigation/native';

export const Header = () => {
  const { goBack } = useNavigation();
  const { colors } = useTheme();
  return (
    <Box>
      <RoundedIcon onPress={goBack}>
        <Icons.arrowLeft color={colors['text-primary']} />
      </RoundedIcon>
      <Text variant="heading">Cadastre-se</Text>
    </Box>
  );
};
