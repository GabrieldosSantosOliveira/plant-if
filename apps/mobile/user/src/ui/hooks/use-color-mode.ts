import { ColorModeContext } from '@/ui/contexts/color-mode-context';
import { useContext } from 'react';

import { WithoutProviderError } from './errors/without-provider-error';
export const useColorMode = () => {
  const value = useContext(ColorModeContext);
  if (Object.keys(value).length === 0) {
    throw new WithoutProviderError(
      'useTheme must be used within an ThemeProvider',
    );
  }
  return value;
};
