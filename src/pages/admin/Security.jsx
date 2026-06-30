import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, Lock, UserX, Search, Filter, Eye, EyeOff, RefreshCw } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Security = () => {
  const { backendUrl } = useApp();
  const [loading, setLoading] = useState(true);
  const [securityLogs, setSecurityLogs] = useState([]);
  const [filter, setFilter] = useState('all'); // all, failed_login, suspicious, blocked
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchSecurityLogs = async () => {
      try {
        // Mock data - would come from API
        const mockLogs = [
          { id: 1, type: 'failed_login', user: 'unknown', ip: '192.168.1.100', message: 'Noto\'g\'ri parol (3 urinish)', severity: 'high', timestamp: '2024-01-15T14:30:00', blocked: false },
          { id: 2, type: 'suspicious', user: 'ali@example.com', ip: '45.33.32.156', message: 'G\'ayrioddiy IP manzil', severity: 'medium', timestamp: '2024-01-15T12:15:00', blocked: false },
          { id: 3, type: 'failed_login', user: 'nigora@example.com', ip: '103.21.244.0', message: 'Noto\'g\'ri parol (5 urinish)', severity: 'high', timestamp: '2024-01-15T10:45:00', blocked: true },
          { id: 4, type: 'blocked', user: 'jamshid@example.com', ip: '178.62.43.22', message: 'Hisob bloklandi - ko\'p urinish', severity: 'critical', timestamp: '2024-01-14T18:20:00', blocked: true },
          { id: 5, type: 'suspicious', user: 'zarina@example.com', ip: '139.59.1.1', message: 'Token invalidation - bir nechi qurilma', severity: 'medium', timestamp: '2024-01-14T15:30:00', blocked: false },
          { id: 6, type: 'failed_login', user: 'unknown', ip: '104.238.140.39', message: 'Noto\'g\'ri parol (2 urinish)', severity: 'low', timestamp: '2024-01-14T11:00:00', blocked: false },
          { id: 7, type: 'suspicious', user: 'sobir@example.com', ip: '167.99.5.1', message: 'Tez-tez login urinishlari', severity: 'medium', timestamp: '2024-01-13T16:45:00', blocked: false },
          { id: 8, type: 'blocked', user: 'unknown', ip: '206.189.123.1', message: 'IP bloklandi - spam aktivligi', severity: 'critical', timestamp: '2024-01-13T09:30:00', blocked: true }
        ];
        setSecurityLogs(mockLogs);
      } catch (err) {
        console.error('Failed to fetch security logs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSecurityLogs();
  }, []);

  const filteredLogs = securityLogs.filter(log => {
    const matchesSearch = log.user?.toLowerCase().includes(search.toLowerCase()) || 
                         log.ip?.includes(search) ||
                         log.message?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || log.type === filter;
    return matchesSearch && matchesFilter;
  });

  const unblockUser = async (logId) => {
    try {
      // Would call API to unblock
      setSecurityLogs(securityLogs.map(log => log.id === logId ? { ...log, blocked: false, type: 'suspicious' } : log));
    } catch (err) {
      console.error('Failed to unblock:', err);
    }
  };

  const getSeverityColor = (severity) => {
    const colors = {
      low: '#10B981',
      medium: '#F59E0B',
      high: '#EF4444',
      critical: '#7C3AED'
    };
    return colors[severity] || '#94A3B8';
  };

  const getTypeIcon = (type) => {
    const icons = {
      failed_login: Lock,
      suspicious: AlertTriangle,
      blocked: UserX
    };
    return icons[type] || Shield;
  };

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
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

  const failedLoginCount = securityLogs.filter(l => l.type === 'failed_login').length;
  const suspiciousCount = securityLogs.filter(l => l.type === 'suspicious').length;
  const blockedCount = securityLogs.filter(l => l.type === 'blocked').length;
  const criticalCount = securityLogs.filter(l => l.severity === 'critical').length;

  return (
    <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px' }}>Xavfsizlik paneli</h1>
            <p style={{ color: 'var(--text-muted)' }}>Tizim xavfsizligini kuzatish</p>
          </div>
          <button
            style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: '#f1f5f9', color: 'var(--text-main)', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <RefreshCw size={18} />
            Yangilash
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <Lock size={24} color="#EF4444" />
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Muvaffaqiyatsiz login</span>
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: 800, margin: 0, color: '#EF4444' }}>{failedLoginCount}</h3>
          </div>

          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <AlertTriangle size={24} color="#F59E0B" />
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Shubhali aktivlik</span>
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: 800, margin: 0, color: '#F59E0B' }}>{suspiciousCount}</h3>
          </div>

          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <UserX size={24} color="#7C3AED" />
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Bloklangan</span>
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: 800, margin: 0, color: '#7C3AED' }}>{blockedCount}</h3>
          </div>

          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <Shield size={24} color="#DC2626" />
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Kritik</span>
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: 800, margin: 0, color: '#DC2626' }}>{criticalCount}</h3>
          </div>
        </div>

        {/* Filters */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '16px', border: '1px solid #f1f1f1', marginBottom: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            <input
              type="text"
              placeholder="Log qidirish..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['all', 'failed_login', 'suspicious', 'blocked'].map((f) => (
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
                {f === 'all' ? 'Barchasi' : f === 'failed_login' ? 'Login xato' : f === 'suspicious' ? 'Shubhali' : 'Bloklangan'}
              </button>
            ))}
          </div>
        </div>

        {/* Security Logs */}
        <div style={{ display: 'grid', gap: '16px' }}>
          {filteredLogs.map((log) => {
            const TypeIcon = getTypeIcon(log.type);
            
            return (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ 
                  background: 'white', 
                  padding: '24px', 
                  borderRadius: '16px', 
                  border: log.severity === 'critical' ? '2px solid #DC2626' : '1px solid #f1f1f1', 
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)' 
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '20px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                      <div style={{ width: '48px', height: '48px', background: `${getSeverityColor(log.severity)}20`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <TypeIcon size={24} color={getSeverityColor(log.severity)} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>{log.user}</h3>
                        <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>{log.ip}</p>
                      </div>
                    </div>

                    <p style={{ fontSize: '14px', color: 'var(--text-main)', marginBottom: '12px' }}>{log.message}</p>

                    <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--text-muted)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Eye size={14} />
                        {getTimeAgo(log.timestamp)}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Severity: 
                        <span style={{ fontWeight: 700, color: getSeverityColor(log.severity) }}>
                          {log.severity.toUpperCase()}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                    <div style={{ padding: '6px 12px', borderRadius: '20px', background: `${getSeverityColor(log.severity)}20`, color: getSeverityColor(log.severity), fontSize: '12px', fontWeight: 700 }}>
                      {log.type === 'failed_login' ? 'Login xato' : log.type === 'suspicious' ? 'Shubhali' : 'Bloklangan'}
                    </div>
                    {log.blocked && (
                      <button
                        onClick={() => unblockUser(log.id)}
                        style={{ padding: '8px 16px', borderRadius: '10px', border: 'none', background: '#10B981', color: 'white', fontWeight: 600, cursor: 'pointer', fontSize: '14px' }}
                      >
                        Blokdan olish
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default Security;
