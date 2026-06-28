import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, User, Copy, Check, ArrowRight } from 'lucide-react';
import { orders } from '../api';
import { useApp } from '../context/AppContext';

const Payment = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { formatPrice } = useApp();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  // Bank details (these should come from backend config)
  const bankDetails = {
    cardNumber: '8600 1234 5678 9012',
    cardHolder: 'SHOP SRY',
    amount: 0
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await orders.getOne(orderId);
        setOrder(res.data);
        bankDetails.amount = res.data.total;
      } catch (err) {
        console.error('Failed to fetch order:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
        style={{ background: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #f1f1f1' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ width: '80px', height: '80px', background: 'rgba(37, 99, 235, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <CreditCard size={40} color="var(--primary)" />
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px' }}>To'lov ma'lumotlari</h1>
          <p style={{ color: 'var(--text-muted)' }}>Buyurtmani rasmiylashtirish uchun to'lov qiling</p>
        </div>

        <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '16px', marginBottom: '24px' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' }}>Karta raqami</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'white', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <CreditCard size={20} color="var(--primary)" />
              <span style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '2px' }}>{bankDetails.cardNumber}</span>
              <button
                onClick={() => handleCopy(bankDetails.cardNumber.replace(/\s/g, ''))}
                style={{ marginLeft: 'auto', padding: '8px', background: 'var(--primary)', color: 'white', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' }}>Karta egasi</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'white', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <User size={20} color="var(--primary)" />
              <span style={{ fontSize: '18px', fontWeight: 700 }}>{bankDetails.cardHolder}</span>
              <button
                onClick={() => handleCopy(bankDetails.cardHolder)}
                style={{ marginLeft: 'auto', padding: '8px', background: 'var(--primary)', color: 'white', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <Copy size={16} />
              </button>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' }}>Summa</label>
            <div style={{ background: 'white', padding: '16px', borderRadius: '12px', border: '2px solid var(--primary)' }}>
              <span style={{ fontSize: '24px', fontWeight: 800, color: 'var(--primary)' }}>{formatPrice(bankDetails.amount)}</span>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' }}>Izoh (Order ID)</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'white', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '16px', fontWeight: 600, fontFamily: 'monospace' }}>#{orderId}</span>
              <button
                onClick={() => handleCopy(orderId)}
                style={{ marginLeft: 'auto', padding: '8px', background: 'var(--primary)', color: 'white', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <Copy size={16} />
              </button>
            </div>
          </div>
        </div>

        <div style={{ background: '#fffbeb', padding: '16px', borderRadius: '12px', marginBottom: '24px', border: '1px solid #fcd34d' }}>
          <p style={{ fontSize: '14px', color: '#92400e', margin: 0 }}>
            ⚠️ Eslatma: To'lov izohiga Order IDni yozishingiz shart. Tasdiqlash uchun chek rasmini yuklang.
          </p>
        </div>

        <motion.button
          onClick={() => navigate(`/payment-upload/${orderId}`)}
          className="btn"
          whileTap={{ scale: 0.98 }}
          style={{ width: '100%', padding: '18px', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
        >
          Men to'lov qildim
          <ArrowRight size={20} />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Payment;
