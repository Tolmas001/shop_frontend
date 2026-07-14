import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const { i18n, t } = useTranslation();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const currency = 'UZS';

  const formatPrice = useCallback((price) => {
    return price.toLocaleString(undefined, { maximumFractionDigits: 0 }) + ' UZS';
  }, []);

  const convertPrice = useCallback((price) => price, []);

  // Apply theme immediately to document
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

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
