import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check, CheckCheck, Trash2, Filter } from 'lucide-react';
import { notifications as notifyApi } from '../../api';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, unread, read

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await notifyApi.getAll();
        setNotifications(res.data || []);
      } catch (err) {
        console.error('Failed to fetch notifications:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !n.is_read;
    if (filter === 'read') return n.is_read;
    return true;
  });

  const markAsRead = async (id) => {
    try {
      await notifyApi.markAsRead(id);
      setNotifications(notifications.map(n => n.id === id ? { ...n, is_read: true } : n));
    } catch (err) {
      console.error('Failed to mark as read:', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await notifyApi.markAllAsRead();
      setNotifications(notifications.map(n => ({ ...n, is_read: true })));
    } catch (err) {
      console.error('Failed to mark all as read:', err);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await notifyApi.delete(id);
      setNotifications(notifications.filter(n => n.id !== id));
    } catch (err) {
      console.error('Failed to delete notification:', err);
    }
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return 'Hozirgina';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min oldin`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} soat oldin`;
    return new Date(date).toLocaleDateString('uz-UZ');
  };

  const getNotificationIcon = (type) => {
    const icons = {
      order: '📦',
      payment: '💳',
      review: '⭐',
      stock: '📉',
      user: '👤',
      system: '⚙️'
    };
    return icons[type] || '📢';
  };

  if (loading) {
    return (
      <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px' }}>Bildirishnomalar</h1>
            <p style={{ color: 'var(--text-muted)' }}>
              {unreadCount > 0 ? `${unreadCount} ta o'qilmagan bildirishnoma` : 'Barcha bildirishnomalar o'qilgan'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: 'var(--primary)', color: 'white', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <CheckCheck size={18} />
                Hammasini o'qish
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          {['all', 'unread', 'read'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '10px 20px',
                borderRadius: '10px',
                border: 'none',
                background: filter === f ? 'var(--primary)' : '#f1f5f9',
                color: filter === f ? 'white' : 'var(--text-main)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: '0.3s'
              }}
            >
              {f === 'all' ? 'Barchasi' : f === 'unread' ? 'O\'qilmagan' : 'O\'qilgan'}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredNotifications.length === 0 ? (
            <div style={{ background: 'white', padding: '60px', borderRadius: '16px', textAlign: 'center', border: '1px solid #f1f1f1' }}>
              <Bell size={48} color="#94a3b8" style={{ marginBottom: '16px' }} />
              <p style={{ color: 'var(--text-muted)', fontSize: '18px' }}>Bildirishnomalar yo'q</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: 'white',
                  padding: '20px',
                  borderRadius: '16px',
                  border: notification.is_read ? '1px solid #f1f1f1' : '2px solid var(--primary)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'flex-start'
                }}
              >
                <div style={{ fontSize: '32px' }}>{getNotificationIcon(notification.type)}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>{notification.title || 'Bildirishnoma'}</h4>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{getTimeAgo(notification.created_at)}</span>
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: '0 0 12px 0' }}>{notification.message}</p>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {!notification.is_read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        style={{ padding: '6px 12px', borderRadius: '8px', border: 'none', background: '#ECFDF5', color: '#059669', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Check size={14} />
                        O'qish
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      style={{ padding: '6px 12px', borderRadius: '8px', border: 'none', background: '#FEF2F2', color: '#DC2626', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Trash2 size={14} />
                      O'chirish
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Notifications;
