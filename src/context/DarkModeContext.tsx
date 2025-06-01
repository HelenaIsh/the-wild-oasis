import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

interface DarkModeInterface {
  isDarkMode: boolean;
  toggleDarkMode?: () => void;
}

const DarkModeContext = createContext<DarkModeInterface>({
  isDarkMode: false,
});

export function DarkModeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia('(prefers-color-shceme: dark').matches,
    'isDarkMode'
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
      document.documentElement.classList.add('light-mode');
    }
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode((mode: boolean) => !mode);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (!context) {
    throw new Error('Dark mode context was used outside provider');
  }

  return context;
}
