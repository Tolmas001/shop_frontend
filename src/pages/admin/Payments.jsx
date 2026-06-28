import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Eye, Loader2, AlertCircle } from 'lucide-react';
import { admin } from '../../api';
import { useApp } from '../../context/AppContext';
import ReceiptModal from '../../components/ReceiptModal';

const Payments = () => {
  const { formatPrice, backendUrl } = useApp();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await admin.getPendingPayments();
        setPayments(res.data || []);
      } catch (err) {
        console.error('Failed to fetch payments:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const handleApprove = async (orderId) => {
    setActionLoading(orderId);
    try {
      await admin.approvePayment(orderId);
      setPayments(payments.filter(p => p.id !== orderId));
    } catch (err) {
      console.error('Failed to approve payment:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (orderId) => {
    setActionLoading(orderId);
    try {
      await admin.rejectPayment(orderId);
      setPayments(payments.filter(p => p.id !== orderId));
    } catch (err) {
      console.error('Failed to reject payment:', err);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 className="spinner-loading" size={40} />
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px' }}>To'lovlar</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
          Tasdiqlashni kutayotgan to'lovlar ({payments.length})
        </p>

        {payments.length === 0 ? (
          <div style={{ background: 'white', padding: '60px', borderRadius: '24px', textAlign: 'center', border: '1px solid #f1f1f1' }}>
            <AlertCircle size={48} color="#94a3b8" style={{ marginBottom: '16px' }} />
            <p style={{ color: 'var(--text-muted)', fontSize: '18px' }}>Hozircha tasdiqlashni kutayotgan to'lovlar yo'q</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '20px' }}>
            {payments.map((payment) => (
              <motion.div
                key={payment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '20px', alignItems: 'center' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <div style={{ width: '48px', height: '48px', background: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--primary)' }}>
                        {payment.customer_name?.[0] || 'U'}
                      </div>
                      <div>
                        <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>{payment.customer_name || 'Foydalanuvchi'}</h3>
                        <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Order #{payment.id}</p>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '16px' }}>
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Summa</label>
                        <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--primary)' }}>{formatPrice(payment.total)}</span>
                      </div>
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Telefon</label>
                        <span style={{ fontSize: '14px', fontWeight: 600 }}>{payment.customer_phone || '-'}</span>
                      </div>
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Sana</label>
                        <span style={{ fontSize: '14px', fontWeight: 600 }}>{new Date(payment.created_at).toLocaleDateString('uz-UZ')}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    {payment.receipt_image && (
                      <button
                        onClick={() => setSelectedReceipt(payment.receipt_image?.startsWith('/') ? `${backendUrl}${payment.receipt_image}` : payment.receipt_image)}
                        style={{ padding: '12px', background: '#f1f5f9', borderRadius: '12px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: 'var(--text-main)' }}
                      >
                        <Eye size={18} />
                        Chek
                      </button>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #f1f1f1' }}>
                  <motion.button
                    onClick={() => handleApprove(payment.id)}
                    disabled={actionLoading === payment.id}
                    whileTap={{ scale: 0.98 }}
                    style={{ flex: 1, padding: '12px', background: '#059669', color: 'white', borderRadius: '12px', border: 'none', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    {actionLoading === payment.id ? <Loader2 size={18} className="spinner-loading" /> : <Check size={18} />}
                    Tasdiqlash
                  </motion.button>
                  <motion.button
                    onClick={() => handleReject(payment.id)}
                    disabled={actionLoading === payment.id}
                    whileTap={{ scale: 0.98 }}
                    style={{ flex: 1, padding: '12px', background: '#dc2626', color: 'white', borderRadius: '12px', border: 'none', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    {actionLoading === payment.id ? <Loader2 size={18} className="spinner-loading" /> : <X size={18} />}
                    Rad etish
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {selectedReceipt && (
        <ReceiptModal
          imageUrl={selectedReceipt}
          onClose={() => setSelectedReceipt(null)}
        />
      )}
    </div>
  );
};

export default Payments;
