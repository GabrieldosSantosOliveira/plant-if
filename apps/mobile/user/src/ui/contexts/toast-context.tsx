import { createContext, ReactNode, FC } from 'react';
import Toast from 'react-native-toast-message';

export interface ToastOptions {
  position?: 'top' | 'bottom';
  title?: string;
  description?: string;
  duration?: number;
}

export interface ToastContextProps {
  success: (options: ToastOptions) => void;
  info: (options: ToastOptions) => void;
  error: (options: ToastOptions) => void;
}
export const ToastContext = createContext<ToastContextProps>(
  {} as ToastContextProps,
);
export interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProviderBase: FC<ToastProviderProps> = ({ children }) => {
  const ONE_SECOND_IN_MILLISECONDS = 1000;
  const FOUR_SECOND_IN_MILLISECONDS = ONE_SECOND_IN_MILLISECONDS * 4;
  const info = (options: ToastOptions) => {
    Toast.show({
      type: 'info',
      position: options.position,
      text1: options.title,
      text2: options.description,
      autoHide: true,
      visibilityTime: options.duration || FOUR_SECOND_IN_MILLISECONDS,
    });
  };
  const error = (options: ToastOptions) => {
    Toast.show({
      type: 'error',
      position: options.position,
      text1: options.title,
      text2: options.description,
      autoHide: true,
      visibilityTime: options.duration || FOUR_SECOND_IN_MILLISECONDS,
    });
  };
  const success = (options: ToastOptions) => {
    Toast.show({
      type: 'success',
      position: options.position,
      text1: options.title,
      text2: options.description,
      autoHide: true,
      visibilityTime: options.duration || FOUR_SECOND_IN_MILLISECONDS,
    });
  };
  return (
    <ToastContext.Provider value={{ info, error, success }}>
      {children}
    </ToastContext.Provider>
  );
};
export const ToastProvider: FC<ToastProviderProps> = ({ children }) => {
  return (
    <ToastProviderBase>
      <>
        {children}
        <Toast />
      </>
    </ToastProviderBase>
  );
};
