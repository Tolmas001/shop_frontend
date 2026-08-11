import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, CheckCircle, XCircle, Clock, DollarSign, Search, Filter, Package as PackageIcon, AlertCircle } from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { adminFeatures } from '../../services/api';

const Refunds = () => {
  const { formatPrice, backendUrl } = useApp();
  const [loading, setLoading] = useState(true);
  const [refunds, setRefunds] = useState([]);
  const [filter, setFilter] = useState('all'); // all, pending, approved, rejected
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchRefunds = async () => {
      try {
        const res = await adminFeatures.getRefunds(filter === 'all' ? undefined : filter);
        setRefunds(res.data || []);
      } catch (err) {
        console.error('Failed to fetch refunds:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRefunds();
  }, [filter]);

  const filteredRefunds = refunds.filter(r => {
    const matchesSearch = r.username?.toLowerCase().includes(search.toLowerCase()) || 
                         r.email?.toLowerCase().includes(search.toLowerCase()) ||
                         r.order_id?.toString().includes(search);
    return matchesSearch;
  });

  const approveRefund = async (refundId) => {
    try {
      await adminFeatures.approveRefund(refundId);
      setRefunds(refunds.map(r => r.id === refundId ? { ...r, status: 'approved', processed_at: new Date().toISOString() } : r));
    } catch (err) {
      console.error('Failed to approve refund:', err);
    }
  };

  const rejectRefund = async (refundId) => {
    try {
      await adminFeatures.rejectRefund(refundId);
      setRefunds(refunds.map(r => r.id === refundId ? { ...r, status: 'rejected', processed_at: new Date().toISOString() } : r));
    } catch (err) {
      console.error('Failed to reject refund:', err);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#F59E0B',
      approved: '#10B981',
      rejected: '#EF4444'
    };
    return colors[status] || '#94A3B8';
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

  const pendingCount = refunds.filter(r => r.status === 'pending').length;
  const approvedCount = refunds.filter(r => r.status === 'approved').length;
  const rejectedCount = refunds.filter(r => r.status === 'rejected').length;
  const totalRefundAmount = refunds.filter(r => r.status === 'approved').reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px' }}>Qaytarishlar va Refunds</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Mahsulot qaytarish so'rovlarini boshqarish</p>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <RotateCcw size={24} color="#F59E0B" />
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Kutilmoqda</span>
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: 800, margin: 0, color: '#F59E0B' }}>{pendingCount}</h3>
          </div>

          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <CheckCircle size={24} color="#10B981" />
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Tasdiqlangan</span>
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: 800, margin: 0, color: '#10B981' }}>{approvedCount}</h3>
          </div>

          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <XCircle size={24} color="#EF4444" />
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Rad etilgan</span>
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: 800, margin: 0, color: '#EF4444' }}>{rejectedCount}</h3>
          </div>

          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <DollarSign size={24} color="#3B82F6" />
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Qaytarilgan summa</span>
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: 800, margin: 0, color: '#3B82F6' }}>{formatPrice(totalRefundAmount)}</h3>
          </div>
        </div>

        {/* Filters */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '16px', border: '1px solid #f1f1f1', marginBottom: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            <input
              type="text"
              placeholder="Refund qidirish..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['all', 'pending', 'approved', 'rejected'].map((f) => (
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
                {f === 'all' ? 'Barchasi' : f === 'pending' ? 'Kutilmoqda' : f === 'approved' ? 'Tasdiqlangan' : 'Rad etilgan'}
              </button>
            ))}
          </div>
        </div>

        {/* Refunds List */}
        <div style={{ display: 'grid', gap: '16px' }}>
          {filteredRefunds.map((refund) => (
            <motion.div
              key={refund.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '20px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ width: '48px', height: '48px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <PackageIcon size={24} color="#3B82F6" />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>Order #{refund.order_id}</h3>
                      <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>{refund.username || refund.customer_name}</p>
                    </div>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Sabab</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', background: '#FEF2F2', borderRadius: '8px' }}>
                      <AlertCircle size={16} color="#EF4444" />
                      <span style={{ fontSize: '14px' }}>{refund.reason}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '24px', fontSize: '14px', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={14} />
                      {getTimeAgo(refund.created_at)}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <DollarSign size={14} />
                      Summa: {formatPrice(refund.amount)}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                  <div style={{ padding: '6px 12px', borderRadius: '20px', background: `${getStatusColor(refund.status)}20`, color: getStatusColor(refund.status), fontSize: '12px', fontWeight: 700 }}>
                    {refund.status === 'pending' ? 'Kutilmoqda' : refund.status === 'approved' ? 'Tasdiqlangan' : 'Rad etilgan'}
                  </div>
                  
                  {refund.status === 'pending' && (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => approveRefund(refund.id)}
                        style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: '#10B981', color: 'white', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                      >
                        <CheckCircle size={18} />
                        Tasdiqlash
                      </button>
                      <button
                        onClick={() => rejectRefund(refund.id)}
                        style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: '#EF4444', color: 'white', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                      >
                        <XCircle size={18} />
                        Rad etish
                      </button>
                    </div>
                  )}

                  {refund.processed_at && (
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      {refund.status === 'approved' ? 'Tasdiqlangan' : 'Rad etilgan'}: {getTimeAgo(refund.processed_at)}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Refunds;
