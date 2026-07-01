import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check, CheckCheck, Trash2, Filter, Package as PackageIcon, CreditCard, Star, TrendingDown, User, Settings, AlertCircle, Clock, MoreVertical } from 'lucide-react';
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
      order: { icon: PackageIcon, color: '#3B82F6', bg: '#EFF6FF' },
      payment: { icon: CreditCard, color: '#10B981', bg: '#ECFDF5' },
      review: { icon: Star, color: '#F59E0B', bg: '#FEF3C7' },
      stock: { icon: TrendingDown, color: '#EF4444', bg: '#FEF2F2' },
      user: { icon: User, color: '#8B5CF6', bg: '#F5F3FF' },
      system: { icon: Settings, color: '#64748B', bg: '#F1F5F9' },
      alert: { icon: AlertCircle, color: '#DC2626', bg: '#FEE2E2' }
    };
    return icons[type] || { icon: Bell, color: '#64748B', bg: '#F1F5F9' };
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
              {unreadCount > 0 ? `${unreadCount} ta o\'qilmagan bildirishnoma` : 'Barcha bildirishnomalar o\'qilgan'}
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredNotifications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ background: 'white', padding: '80px 40px', borderRadius: '20px', textAlign: 'center', border: '2px dashed #e2e8f0' }}
            >
              <div style={{ width: '80px', height: '80px', background: '#F1F5F9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <Bell size={40} color="#94a3b8" />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px', color: 'var(--text-main)' }}>Bildirishnomalar yo'q</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Hozircha sizga yangi bildirishnomalar yo'q</p>
            </motion.div>
          ) : (
            filteredNotifications.map((notification, index) => {
              const iconConfig = getNotificationIcon(notification.type);
              const IconComponent = iconConfig.icon;
              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.01, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
                  style={{
                    background: notification.is_read ? '#F8FAFC' : 'white',
                    padding: '20px',
                    borderRadius: '16px',
                    border: notification.is_read ? '1px solid #e2e8f0' : '2px solid var(--primary)',
                    boxShadow: notification.is_read ? 'none' : '0 4px 12px rgba(59, 130, 246, 0.1)',
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'flex-start',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => !notification.is_read && markAsRead(notification.id)}
                >
                  <div style={{ 
                    width: '48px', 
                    height: '48px', 
                    background: iconConfig.bg, 
                    borderRadius: '12px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <IconComponent size={24} color={iconConfig.color} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', gap: '12px' }}>
                      <h4 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>{notification.title || 'Bildirishnoma'}</h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--text-muted)', flexShrink: 0 }}>
                        <Clock size={12} />
                        {getTimeAgo(notification.created_at)}
                      </div>
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: '0 0 12px 0', lineHeight: '1.5' }}>{notification.message}</p>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      {!notification.is_read && (
                        <span style={{ padding: '4px 10px', borderRadius: '6px', background: '#EFF6FF', color: '#3B82F6', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          Yangi
                        </span>
                      )}
                      <button
                        onClick={(e) => { e.stopPropagation(); deleteNotification(notification.id); }}
                        style={{ padding: '6px 12px', borderRadius: '8px', border: 'none', background: 'transparent', color: '#94A3B8', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', transition: '0.2s' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#EF4444'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
                      >
                        <Trash2 size={14} />
                        O'chirish
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Notifications;
