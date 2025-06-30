import { createContext, useContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction, } from "react";

type DarkModeContextType = {
    dark: boolean;
    toggleDarkMode: () => void;
    setDark: Dispatch<SetStateAction<boolean>>;
};

export const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export const useDarkMode = () => {
    const context = useContext(DarkModeContext);
    if (!context) {
        throw new Error('useDarkMode must be used within a DarkModeProvider');
    }
    return context;
};

// Dark mode provider component
export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
    const [dark, setDark] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    });

    const toggleDarkMode = () => setDark(prev => !prev);

    // Apply dark mode class to document
    useEffect(() => {
        const htmlEl = document.documentElement;
        if (dark) {
            htmlEl.classList.add('dark');
        } else {
            htmlEl.classList.remove('dark');
        }
    }, [dark]);

    return (
        <DarkModeContext.Provider value={{ dark, toggleDarkMode, setDark }}>
            {children}
        </DarkModeContext.Provider>
    );
};