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
    const token = localStorage.getItem('token');
    if (token) {
      setLoading(true);
      auth.me()
        .then(res => {
          setUser(res.data.user);
          fetchNotifications();
        })
        .catch(() => {
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
    setUser(res.data.user);
    fetchNotifications();
  };

  const googleLogin = async (credential) => {
    const res = await auth.googleLogin(credential);
    localStorage.setItem('token', res.data.accessToken);
    setUser(res.data.user);
  };

  const register = async (username, email, password) => {
    await auth.register(username, email, password);
    await login(username, password);
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
