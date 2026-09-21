import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const { i18n, t } = useTranslation();
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    
    // Auto-detect system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });
  const currency = 'UZS';

  const formatPrice = useCallback((price) => {
    return price.toLocaleString(undefined, { maximumFractionDigits: 0 }) + ' UZS';
  }, []);

  const convertPrice = useCallback((price) => price, []);

  // Apply theme immediately to document with smooth transition
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Add smooth transition to body
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Apply smooth transition
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang);
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      toggleTheme,
      language: i18n.language,
      changeLanguage,
      t,
      currency,
      formatPrice,
      convertPrice
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
