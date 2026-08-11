import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, Lock, UserX, Search, Filter, Eye, EyeOff, RefreshCw } from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { security } from '../../services/api';

const Security = () => {
  const { backendUrl } = useApp();
  const [loading, setLoading] = useState(true);
  const [securityLogs, setSecurityLogs] = useState([]);
  const [filter, setFilter] = useState('all'); // all, failed_login, suspicious, blocked
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchSecurityLogs = async () => {
      try {
        // Fetch different types of security logs based on filter
        if (filter === 'all' || filter === 'failed_login') {
          const failedRes = await security.getFailedAttempts(50, 7);
          const failedLogs = (failedRes.data || []).map(log => ({
            id: log.id,
            type: 'failed_login',
            user: log.username || 'unknown',
            ip: log.details?.ip || 'unknown',
            message: 'Noto\'g\'ri parol',
            severity: 'high',
            timestamp: log.created_at,
            blocked: false
          }));
          setSecurityLogs(failedLogs);
        } else if (filter === 'suspicious') {
          const suspiciousRes = await security.getSuspicious();
          const suspiciousLogs = [];
          
          // Add suspicious IPs
          (suspiciousRes.data?.suspicious_ips || []).forEach((item, idx) => {
            suspiciousLogs.push({
              id: `susp-${idx}`,
              type: 'suspicious',
              user: 'unknown',
              ip: item.ip_address,
              message: `Ko'p urinish: ${item.attempt_count}`,
              severity: 'medium',
              timestamp: item.last_attempt,
              blocked: false
            });
          });
          
          setSecurityLogs(suspiciousLogs);
        } else if (filter === 'blocked') {
          const suspiciousRes = await security.getSuspicious();
          const blockedLogs = [];
          
          // Add rapid signups as blocked
          (suspiciousRes.data?.rapid_signups || []).forEach((item, idx) => {
            blockedLogs.push({
              id: `block-${idx}`,
              type: 'blocked',
              user: 'unknown',
              ip: item.ip_address,
              message: `Tez ro'yxatdan o'tish: ${item.signup_count}`,
              severity: 'critical',
              timestamp: item.last_signup,
              blocked: true
            });
          });
          
          setSecurityLogs(blockedLogs);
        }
      } catch (err) {
        console.error('Failed to fetch security logs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSecurityLogs();
  }, [filter]);

  const filteredLogs = securityLogs.filter(log => {
    const matchesSearch = log.user?.toLowerCase().includes(search.toLowerCase()) || 
                         log.ip?.includes(search) ||
                         log.message?.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  const unblockUser = async (logId) => {
    try {
      // This would call an API to unblock - for now just update local state
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
