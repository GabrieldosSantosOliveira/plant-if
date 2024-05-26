import { ThemeLight } from '@/ui/styles/theme';
import { ThemeProvider } from '@shopify/restyle';
import { ReactNode, createContext } from 'react';
export type ThemeType = 'light' | 'dark';
export type ColorModeMockType = 'light' | 'dark' | 'automatic';
export interface ColorModeMockContextProps {
  theme: ThemeType;
  ColorModeMock: ColorModeMockType;
  changeColorModeToDark(): Promise<void>;
  changeColorModeToLight(): Promise<void>;
  changeColorModeToAutomatic(): Promise<void>;
}
export const ColorModeMockContext = createContext<ColorModeMockContextProps>(
  {} as ColorModeMockContextProps,
);
export interface ColorModeMockProviderProps {
  children: ReactNode;
}
export const ColorModeMockMockProvider: React.FC<
  ColorModeMockProviderProps
> = ({ children }) => {
  return (
    <ColorModeMockContext.Provider
      value={{
        theme: 'light',
        ColorModeMock: 'light',
        changeColorModeToAutomatic: async () => {},
        changeColorModeToDark: async () => {},
        changeColorModeToLight: async () => {},
      }}
    >
      <ThemeProvider theme={ThemeLight}>{children}</ThemeProvider>
    </ColorModeMockContext.Provider>
  );
};
