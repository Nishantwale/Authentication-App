import React, { createContext, useState, useContext } from 'react';
import { Appearance, StatusBar, Platform } from 'react-native';

const lightTheme = {
  background: '#f7f7f7',
  card: '#fff',
  text: '#222',
  inputBg: '#f0f0f0',
  button: '#007bff',
  buttonText: '#fff',
  link: '#007bff',
};
const darkTheme = {
  background: '#181818',
  card: '#222',
  text: '#fff',
  inputBg: '#333',
  button: '#66aaff',
  buttonText: '#222',
  link: '#66aaff',
};

export const ThemeContext = createContext();
export function ThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState(Appearance.getColorScheme() || 'light');
  React.useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      setThemeMode(colorScheme || 'light');
    });
    return () => listener.remove();
  }, []);
  const isDark = themeMode === 'dark';
  const theme = isDark ? darkTheme : lightTheme;
  const toggleTheme = () => setThemeMode(t => (t === 'dark' ? 'light' : 'dark'));
  React.useEffect(() => {
    StatusBar.setBarStyle(isDark ? 'light-content' : 'dark-content');
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(theme.background);
    }
  }, [isDark, theme.background]);
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
