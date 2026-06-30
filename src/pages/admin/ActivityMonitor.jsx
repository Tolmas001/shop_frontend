import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Search, Filter, Clock, User, RefreshCw } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const ActivityMonitor = () => {
  const { backendUrl } = useApp();
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState([]);
  const [filter, setFilter] = useState('all'); // all, create, update, delete, login, logout
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // Mock data - would come from API
        const mockActivities = [
          { id: 1, admin: 'Ali Karimov', action: 'created', entity: 'product', details: 'iPhone 14 Pro', timestamp: '2024-01-15T14:30:00', ip: '192.168.1.100' },
          { id: 2, admin: 'Nigora Rahimova', action: 'approved', entity: 'payment', details: 'Order #12345', timestamp: '2024-01-15T14:15:00', ip: '192.168.1.101' },
          { id: 3, admin: 'Jamshid Toshmatov', action: 'deleted', entity: 'category', details: 'Old Electronics', timestamp: '2024-01-15T13:45:00', ip: '192.168.1.102' },
          { id: 4, admin: 'Zarina Nazarova', action: 'updated', entity: 'product', details: 'AirPods Pro price', timestamp: '2024-01-15T12:30:00', ip: '192.168.1.103' },
          { id: 5, admin: 'Sobir Qodirov', action: 'rejected', entity: 'refund', details: 'Order #12346', timestamp: '2024-01-15T11:15:00', ip: '192.168.1.104' },
          { id: 6, admin: 'Ali Karimov', action: 'created', entity: 'promo', details: 'SUMMER20 code', timestamp: '2024-01-15T10:00:00', ip: '192.168.1.100' },
          { id: 7, admin: 'Nigora Rahimova', action: 'updated', entity: 'user', details: 'Blocked user #45', timestamp: '2024-01-15T09:30:00', ip: '192.168.1.101' },
          { id: 8, admin: 'Jamshid Toshmatov', action: 'created', entity: 'ad', details: 'Banner ad #12', timestamp: '2024-01-15T08:45:00', ip: '192.168.1.102' },
          { id: 9, admin: 'Zarina Nazarova', action: 'approved', entity: 'review', details: 'Product #78 review', timestamp: '2024-01-14T18:20:00', ip: '192.168.1.103' },
          { id: 10, admin: 'Sobir Qodirov', action: 'deleted', entity: 'product', details: 'Samsung Galaxy S21', timestamp: '2024-01-14T17:00:00', ip: '192.168.1.104' }
        ];
        setActivities(mockActivities);
      } catch (err) {
        console.error('Failed to fetch activities:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  const filteredActivities = activities.filter(a => {
    const matchesSearch = a.admin?.toLowerCase().includes(search.toLowerCase()) || 
                         a.details?.toLowerCase().includes(search.toLowerCase()) ||
                         a.entity?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || a.action === filter;
    return matchesSearch && matchesFilter;
  });

  const getActionColor = (action) => {
    const colors = {
      created: '#10B981',
      updated: '#3B82F6',
      deleted: '#EF4444',
      approved: '#F59E0B',
      rejected: '#DC2626'
    };
    return colors[action] || '#94A3B8';
  };

  const getActionIcon = (action) => {
    const icons = {
      created: '+',
      updated: '✎',
      deleted: '×',
      approved: '✓',
      rejected: '✕'
    };
    return icons[action] || '•';
  };

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return 'Hozirgina';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} min oldin`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} soat oldin`;
    return `${Math.floor(seconds / 86400)} kun oldin`;
  };

  if (loading) {
    return (
      <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px' }}>Activity Monitor</h1>
            <p style={{ color: 'var(--text-muted)' }}>Admin harakatlarini kuzatish</p>
          </div>
          <button
            style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: '#f1f5f9', color: 'var(--text-main)', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <RefreshCw size={18} />
            Yangilash
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #f1f1f1', textAlign: 'center' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 800, margin: 0 }}>{activities.length}</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>Jami</p>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #f1f1f1', textAlign: 'center' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 800, margin: 0, color: '#10B981' }}>{activities.filter(a => a.action === 'created').length}</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>Yaratildi</p>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #f1f1f1', textAlign: 'center' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 800, margin: 0, color: '#3B82F6' }}>{activities.filter(a => a.action === 'updated').length}</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>Yangilandi</p>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #f1f1f1', textAlign: 'center' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 800, margin: 0, color: '#EF4444' }}>{activities.filter(a => a.action === 'deleted').length}</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>O'chirildi</p>
          </div>
        </div>

        {/* Filters */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '16px', border: '1px solid #f1f1f1', marginBottom: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            <input
              type="text"
              placeholder="Activity qidirish..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['all', 'created', 'updated', 'deleted', 'approved', 'rejected'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '10px 16px',
                  borderRadius: '10px',
                  border: 'none',
                  background: filter === f ? 'var(--primary)' : '#f1f5f9',
                  color: filter === f ? 'white' : 'var(--text-main)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: '0.3s',
                  fontSize: '14px'
                }}
              >
                {f === 'all' ? 'Barchasi' : f === 'created' ? 'Yaratildi' : f === 'updated' ? 'Yangilandi' : f === 'deleted' ? 'O\'chirildi' : f === 'approved' ? 'Tasdiqlandi' : 'Rad etildi'}
              </button>
            ))}
          </div>
        </div>

        {/* Activity List */}
        <div style={{ display: 'grid', gap: '12px' }}>
          {filteredActivities.map((activity) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ 
                background: 'white', 
                padding: '20px', 
                borderRadius: '12px', 
                border: '1px solid #f1f1f1', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}
            >
              <div style={{ 
                width: '48px', 
                height: '48px', 
                background: `${getActionColor(activity.action)}20`, 
                borderRadius: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 800,
                color: getActionColor(activity.action)
              }}>
                {getActionIcon(activity.action)}
              </div>
              
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <User size={16} color="var(--text-muted)" />
                    <span style={{ fontWeight: 700 }}>{activity.admin}</span>
                  </div>
                  <span style={{ color: 'var(--text-muted)' }}>•</span>
                  <span style={{ 
                    padding: '4px 12px', 
                    borderRadius: '20px', 
                    background: `${getActionColor(activity.action)}20`, 
                    color: getActionColor(activity.action), 
                    fontSize: '12px', 
                    fontWeight: 700,
                    textTransform: 'capitalize'
                  }}>
                    {activity.action}
                  </span>
                  <span style={{ color: 'var(--text-muted)' }}>•</span>
                  <span style={{ fontWeight: 600, color: 'var(--primary)' }}>{activity.entity}</span>
                </div>
                <p style={{ fontSize: '14px', color: 'var(--text-main)', margin: '0 0 8px 0' }}>{activity.details}</p>
                <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--text-muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={14} />
                    {getTimeAgo(activity.timestamp)}
                  </span>
                  <span>IP: {activity.ip}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ActivityMonitor;
