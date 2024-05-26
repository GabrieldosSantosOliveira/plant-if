import { createContext, FC, ReactNode, useState } from 'react';
export interface InputContextProps {
  isFocus: boolean;
  withFocus: () => void;
  withoutFocus: () => void;
}
export const InputContext = createContext<InputContextProps>(
  {} as InputContextProps,
);
export interface InputProviderProps {
  children: ReactNode;
}
export const InputProvider: FC<InputProviderProps> = ({ children }) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <InputContext.Provider
      value={{
        isFocus,
        withFocus() {
          setIsFocus(true);
        },
        withoutFocus() {
          setIsFocus(false);
        },
      }}
    >
      {children}
    </InputContext.Provider>
  );
};
