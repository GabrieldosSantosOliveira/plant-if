import { useColorMode } from '@/ui/hooks/use-color-mode';
import { Theme } from '@/ui/styles/theme';
import { useTheme } from '@shopify/restyle';
import {
  StatusBar as ExpoStatusBar,
  StatusBarProps as ExpoStatusBarProps,
} from 'expo-status-bar';
import { FC } from 'react';
export const StatusBar: FC<ExpoStatusBarProps> = (props) => {
  const { theme } = useColorMode();
  const { colors } = useTheme<Theme>();
  return (
    <ExpoStatusBar
      translucent
      backgroundColor={colors['main-background']}
      style={theme === 'dark' ? 'light' : 'dark'}
      {...props}
    />
  );
};
