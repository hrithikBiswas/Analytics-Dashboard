'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

interface ThemeToggleProps {
    className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
    const { theme, setTheme } = useTheme();

    return (
        <button
            className={`p-2 rounded-md transition-colors ${className}`}
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label="Toggle theme"
        >
            {theme === 'light' ? (
                <Sun
                    className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                    size={20}
                />
            ) : (
                <Moon
                    className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                    size={20}
                />
            )}
        </button>
    );
};
