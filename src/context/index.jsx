import React from 'react';
import { NotificationProvider } from './NotificationContext';
import { ThemeProvider } from './ThemeContext';
import { AuthProvider } from './AuthContext';
import { CartProvider } from './CartContext';

export const AppProviders = ({ children }) => {
  return (
    <NotificationProvider>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </NotificationProvider>
  );
};
