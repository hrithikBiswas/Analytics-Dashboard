'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

interface ThemeToggleProps {
    className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = () => {
    const { theme, setTheme } = useTheme();

    return (
        <button
            // onClick={toggleTheme}
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Toggle theme"
        >
            {theme === 'light' ? (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            ) : (
                <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            )}
        </button>
    );
};
