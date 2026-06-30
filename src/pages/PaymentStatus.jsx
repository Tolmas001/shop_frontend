import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { orders } from '../api';

const PaymentStatus = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('waiting_verification');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await orders.getOne(orderId);
        const orderStatus = res.data.payment_status || res.data.status;
        setStatus(orderStatus);

        if (orderStatus === 'paid') {
          navigate(`/payment-success/${orderId}`);
        } else if (orderStatus === 'rejected') {
          navigate(`/payment-rejected/${orderId}`);
        }
      } catch (err) {
        console.error('Failed to check status:', err);
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 5000);

    return () => clearInterval(interval);
  }, [orderId, navigate]);

  if (loading) {
    return (
      <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ background: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #f1f1f1', textAlign: 'center' }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{ width: '80px', height: '80px', background: 'rgba(37, 99, 235, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}
        >
          <RefreshCw size={40} color="var(--primary)" />
        </motion.div>

        <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '16px' }}>To'lovingiz tekshirilmoqda</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '16px', marginBottom: '32px' }}>
          Admin tasdiqlashini kuting. Bu bir necha daqiqa davom etishi mumkin.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', color: 'var(--text-muted)' }}>
          <Clock size={20} />
          <span style={{ fontSize: '14px' }}>Har 5 sekundda avtomatik tekshiriladi</span>
        </div>

        <div style={{ marginTop: '32px', padding: '16px', background: '#f8fafc', borderRadius: '12px' }}>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>
            Buyurtma ID: <span style={{ fontWeight: 700, fontFamily: 'monospace' }}>#{orderId}</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentStatus;
