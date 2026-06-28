import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { XCircle, RefreshCw, Home } from 'lucide-react';

const PaymentRejected = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="container" style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ background: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #f1f1f1', textAlign: 'center' }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.5 }}
          style={{ width: '100px', height: '100px', background: '#fef2f2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}
        >
          <XCircle size={50} color="#dc2626" />
        </motion.div>

        <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '16px', color: '#dc2626' }}>To'lov topilmadi</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '18px', marginBottom: '32px' }}>
          Qayta yuboring
        </p>

        <div style={{ background: '#fef2f2', padding: '20px', borderRadius: '16px', marginBottom: '32px', border: '1px solid #fecaca' }}>
          <p style={{ fontSize: '14px', color: '#991b1b', margin: 0 }}>
            Siz yuborgan chek rasmini tekshirib bo'lmadi. Iltimos, to'g'ri chek rasmini yuklang yoki admin bilan bog'laning.
          </p>
        </div>

        <div style={{ display: 'grid', gap: '12px' }}>
          <motion.button
            onClick={() => navigate(`/payment-upload/${orderId}`)}
            className="btn"
            whileTap={{ scale: 0.98 }}
            style={{ padding: '16px', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <RefreshCw size={20} />
            Qayta yuklash
          </motion.button>
          <motion.button
            onClick={() => navigate('/')}
            className="btn"
            whileTap={{ scale: 0.98 }}
            style={{ padding: '16px', fontSize: '16px', background: 'white', color: 'var(--text-main)', border: '2px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <Home size={20} />
            Bosh sahifaga qaytish
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentRejected;
