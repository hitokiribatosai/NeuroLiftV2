import React, { createContext, useContext, useState, useEffect } from 'react';
import { safeStorage } from '../utils/storage';

export type Theme = 'dark' | 'light';

interface ThemeContextType {
    theme: Theme;
    setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: 'dark',
    setTheme: () => { },
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setThemeState] = useState<Theme>(() => {
        const saved = safeStorage.getItem('neuroLift_theme') as Theme;
        return saved === 'light' ? 'light' : 'dark';
    });

    useEffect(() => {
        const html = document.documentElement;

        if (theme === 'dark') {
            html.classList.add('dark');
            html.classList.remove('light');
            html.style.colorScheme = 'dark';
            html.style.color = '#ffffff';
            html.style.setProperty('-webkit-text-fill-color', '#ffffff');
            document.body.style.color = '#ffffff';
            document.body.style.setProperty('-webkit-text-fill-color', '#ffffff');
            document.body.style.backgroundColor = '#0a0a0a';
        } else {
            html.classList.remove('dark');
            html.classList.add('light');
            html.style.colorScheme = 'light';
            html.style.color = '#09090b';
            html.style.setProperty('-webkit-text-fill-color', '#09090b');
            document.body.style.color = '#09090b';
            document.body.style.setProperty('-webkit-text-fill-color', '#09090b');
            document.body.style.backgroundColor = '#ffffff';
        }

        safeStorage.setItem('neuroLift_theme', theme);
    }, [theme]);

    const setTheme = (t: Theme) => setThemeState(t);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
