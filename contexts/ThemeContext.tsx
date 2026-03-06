import React, { createContext, useContext, useState, useEffect } from 'react';
import { safeStorage } from '../utils/storage';

export type Theme = 'dark' | 'light';
export type AccentColor = 'default' | 'pink' | 'red' | 'yellow';

interface ThemeContextType {
    theme: Theme;
    setTheme: (t: Theme) => void;
    accent: AccentColor;
    setAccent: (a: AccentColor) => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: 'dark',
    setTheme: () => { },
    accent: 'default',
    setAccent: () => { },
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setThemeState] = useState<Theme>(() => {
        const saved = safeStorage.getItem('neuroLift_theme') as Theme;
        return saved === 'light' ? 'light' : 'dark';
    });

    const [accent, setAccentState] = useState<AccentColor>(() => {
        const saved = safeStorage.getItem('neuroLift_accent') as AccentColor;
        return ['default', 'pink', 'red', 'yellow'].includes(saved) ? saved : 'default';
    });

    useEffect(() => {
        const html = document.documentElement;

        // Apply dark/light theme
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
            html.style.color = '#18181b';
            html.style.setProperty('-webkit-text-fill-color', '#18181b');
            document.body.style.color = '#18181b';
            document.body.style.setProperty('-webkit-text-fill-color', '#18181b');
            document.body.style.backgroundColor = '#ffffff';
        }
        safeStorage.setItem('neuroLift_theme', theme);
    }, [theme]);

    useEffect(() => {
        // Apply accent color modifier
        document.documentElement.setAttribute('data-accent', accent);
        safeStorage.setItem('neuroLift_accent', accent);
    }, [accent]);

    const setTheme = (t: Theme) => setThemeState(t);
    const setAccent = (a: AccentColor) => setAccentState(a);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, accent, setAccent }}>
            {children}
        </ThemeContext.Provider>
    );
};
