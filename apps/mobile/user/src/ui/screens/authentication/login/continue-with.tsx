import { Box } from '@/ui/components/shared/box';
import { Text } from '@/ui/components/shared/text';

export const ContinueWith = () => {
  return (
    <Box flexDirection="row" alignItems="center" gap="md" opacity={0.4}>
      <Box flex={1} height={1} bg="text-primary" />
      <Text variant="input-label">ou continuar com</Text>
      <Box flex={1} height={1} bg="text-primary" />
    </Box>
  );
};
