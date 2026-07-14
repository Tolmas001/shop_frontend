import React, { createContext, useContext, useState, useCallback } from 'react';
import { notifications as notifyApi } from '../services/api';

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const showNotification = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(n => n.id !== id));
    }, 3000);
  }, []);

  const fetchNotifications = useCallback(async () => {
    if (!localStorage.getItem('token')) return;
    try {
      const res = await notifyApi.getAll();
      setNotifications(res.data);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  }, []);

  const markAllAsRead = async () => {
    try {
      await notifyApi.markAllRead();
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    } catch (err) {
      console.error(err);
    }
  };

  const markAsRead = async (id) => {
    try {
      await notifyApi.markAsRead(id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <NotificationContext.Provider value={{
      toasts, setToasts, showNotification,
      notifications, setNotifications, fetchNotifications, markAllAsRead, markAsRead
    }}>
      {children}
    </NotificationContext.Provider>
  );
};
