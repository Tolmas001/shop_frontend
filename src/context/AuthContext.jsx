import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../services/api';
import { useNotifications } from './NotificationContext';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { fetchNotifications } = useNotifications();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get('token');

    if (urlToken) {
      localStorage.setItem('token', urlToken);
      // Clean up the URL only if we are not on login-success
      if (!window.location.pathname.includes('login-success')) {
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }

    const token = localStorage.getItem('token');

    if (token) {
      setLoading(true);
      auth.me()
        .then(res => {
          const userData = res.data?.user || res.data;
          console.log('AuthContext - User data from /api/auth/me:', userData);
          
          if (userData && userData.id && userData.username) {
            // Ensure role exists, default to 'user' if missing
            if (!userData.role) {
              userData.role = 'user';
            }
            
            // Create a safe user object with all required fields
            const safeUser = {
              id: userData.id,
              username: userData.username,
              email: userData.email,
              role: userData.role || 'user',
              image: userData.image,
              full_name: userData.full_name,
              phone: userData.phone,
              points: userData.points || 0,
              notifications_enabled: userData.notifications_enabled !== false,
              privacy_private: userData.privacy_private || false,
              address_list: userData.address_list || [],
              saved_cards: userData.saved_cards || []
            };
            
            setUser(safeUser);
            fetchNotifications();
          } else {
            console.error('AuthContext - Invalid user data in response:', userData);
            localStorage.removeItem('token');
            setUser(null);
          }
        })
        .catch((err) => {
          console.error('AuthContext - Error fetching user:', err);
          localStorage.removeItem('token');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [fetchNotifications]);

  const login = async (username, password) => {
    const res = await auth.login(username, password);
    localStorage.setItem('token', res.data.accessToken);
    
    // Create safe user object
    const userData = res.data.user;
    const safeUser = {
      id: userData.id,
      username: userData.username,
      email: userData.email,
      role: userData.role || 'user',
      image: userData.image,
      full_name: userData.full_name,
      phone: userData.phone,
      points: userData.points || 0,
      notifications_enabled: userData.notifications_enabled !== false,
      privacy_private: userData.privacy_private || false,
      address_list: userData.address_list || [],
      saved_cards: userData.saved_cards || []
    };
    
    setUser(safeUser);
    fetchNotifications();
  };

  const googleLogin = async (credential) => {
    const res = await auth.googleLogin(credential);
    localStorage.setItem('token', res.data.accessToken);
    
    // Create safe user object
    const userData = res.data.user;
    const safeUser = {
      id: userData.id,
      username: userData.username,
      email: userData.email,
      role: userData.role || 'user',
      image: userData.image,
      full_name: userData.full_name,
      phone: userData.phone,
      points: userData.points || 0,
      notifications_enabled: userData.notifications_enabled !== false,
      privacy_private: userData.privacy_private || false,
      address_list: userData.address_list || [],
      saved_cards: userData.saved_cards || []
    };
    
    setUser(safeUser);
  };

  const register = async (username, email, password) => {
    const res = await auth.register(username, email, password);
    localStorage.setItem('token', res.data.accessToken);
    
    // Create safe user object
    const userData = res.data.user;
    const safeUser = {
      id: userData.id,
      username: userData.username,
      email: userData.email,
      role: userData.role || 'user',
      image: userData.image,
      full_name: userData.full_name,
      phone: userData.phone,
      points: userData.points || 0,
      notifications_enabled: userData.notifications_enabled !== false,
      privacy_private: userData.privacy_private || false,
      address_list: userData.address_list || [],
      saved_cards: userData.saved_cards || []
    };
    
    setUser(safeUser);
    fetchNotifications();
  };

  const updateProfile = async (data) => {
    const res = await auth.updateProfile(data);
    setUser(res.data.user);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const forgotPassword = async (email) => {
    return await auth.forgotPassword(email);
  };

  const verifyResetCode = async (email, code) => {
    return await auth.verifyResetCode(email, code);
  };

  const resetPassword = async (email, code, newPassword) => {
    return await auth.resetPassword(email, code, newPassword);
  };

  return (
    <AuthContext.Provider value={{
      user, setUser, loading, login, register, googleLogin, logout, updateProfile, forgotPassword, verifyResetCode, resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};
