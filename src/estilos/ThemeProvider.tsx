import resolveConfig from 'tailwindcss/resolveConfig';
import config from '@src/../tailwindcss-config';
import React, { useContext } from 'react';
import { Theme } from './StylingTypes';

const tailwindConfig = resolveConfig(config as any);

type ThemeContextValue = Theme;

const ThemeContext = React.createContext({} as ThemeContextValue);

export const useTheme = () => {
  return useContext(ThemeContext);
};

type ThemeProviderProps = React.PropsWithChildren<{}>;

function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <ThemeContext.Provider value={tailwindConfig.theme as Theme}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
