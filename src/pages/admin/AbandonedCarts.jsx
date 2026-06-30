import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Mail, Clock, DollarSign, Send, Search, TrendingUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const AbandonedCarts = () => {
  const { formatPrice, backendUrl } = useApp();
  const [loading, setLoading] = useState(true);
  const [carts, setCarts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchAbandonedCarts = async () => {
      try {
        // Mock data - would come from API
        const mockCarts = [
          { id: 1, user: 'Ali Karimov', email: 'ali@example.com', items: [{ name: 'iPhone 14 Pro', price: 12000000, quantity: 1 }], total: 12000000, abandoned_at: '2024-01-15T10:30:00', recovery_sent: false },
          { id: 2, user: 'Nigora Rahimova', email: 'nigora@example.com', items: [{ name: 'AirPods Pro', price: 2500000, quantity: 2 }], total: 5000000, abandoned_at: '2024-01-14T15:45:00', recovery_sent: true },
          { id: 3, user: 'Jamshid Toshmatov', email: 'jamshid@example.com', items: [{ name: 'MacBook Air', price: 15000000, quantity: 1 }, { name: 'iPhone 13', price: 8000000, quantity: 1 }], total: 23000000, abandoned_at: '2024-01-13T09:20:00', recovery_sent: false },
          { id: 4, user: 'Zarina Nazarova', email: 'zarina@example.com', items: [{ name: 'Apple Watch', price: 3000000, quantity: 1 }], total: 3000000, abandoned_at: '2024-01-12T14:00:00', recovery_sent: true },
          { id: 5, user: 'Sobir Qodirov', email: 'sobir@example.com', items: [{ name: 'iPad Pro', price: 7500000, quantity: 1 }], total: 7500000, abandoned_at: '2024-01-10T11:30:00', recovery_sent: false }
        ];
        setCarts(mockCarts);
      } catch (err) {
        console.error('Failed to fetch abandoned carts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAbandonedCarts();
  }, []);

  const filteredCarts = carts.filter(c => {
    return c.user?.toLowerCase().includes(search.toLowerCase()) || 
           c.email?.toLowerCase().includes(search.toLowerCase());
  });

  const sendReminder = async (cartId) => {
    try {
      // Would call API to send reminder email
      setCarts(carts.map(c => c.id === cartId ? { ...c, recovery_sent: true } : c));
    } catch (err) {
      console.error('Failed to send reminder:', err);
    }
  };

  const totalAbandonedValue = carts.reduce((sum, c) => sum + c.total, 0);
  const recoveryRate = carts.filter(c => c.recovery_sent).length / carts.length * 100;

  const getTimeAgo =(date) => {
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

  return (
    <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px' }}>Tashlab ketilgan savatlar</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Savatga qo'shib chiqib ketgan foydalanuvchilarni kuzatish</p>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <ShoppingCart size={24} color="#3B82F6" />
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Tashlab ketilgan</span>
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: 800, margin: 0 }}>{carts.length}</h3>
          </div>

          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <DollarSign size={24} color="#10B981" />
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Jami qiymat</span>
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: 800, margin: 0 }}>{formatPrice(totalAbandonedValue)}</h3>
          </div>

          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <Mail size={24} color="#F59E0B" />
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Eslatma yuborildi</span>
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: 800, margin: 0 }}>{carts.filter(c => c.recovery_sent).length}</h3>
          </div>

          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <TrendingUp size={24} color="#8B5CF6" />
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Recovery rate</span>
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: 800, margin: 0 }}>{recoveryRate.toFixed(1)}%</h3>
          </div>
        </div>

        {/* Search */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '16px', border: '1px solid #f1f1f1', marginBottom: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            <input
              type="text"
              placeholder="Foydalanuvchi qidirish..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none' }}
            />
          </div>
        </div>

        {/* Carts List */}
        <div style={{ display: 'grid', gap: '16px' }}>
          {filteredCarts.map((cart) => (
            <motion.div
              key={cart.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '20px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ width: '48px', height: '48px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ShoppingCart size={24} color="#3B82F6" />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>{cart.user}</h3>
                      <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>{cart.email}</p>
                    </div>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Mahsulotlar</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {cart.items.map((item, index) => (
                        <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: '#f8fafc', borderRadius: '8px' }}>
                          <span style={{ fontSize: '14px' }}>{item.name} x{item.quantity}</span>
                          <span style={{ fontSize: '14px', fontWeight: 600 }}>{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '24px', fontSize: '14px', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={14} />
                      {getTimeAgo(cart.abandoned_at)}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <DollarSign size={14} />
                      Jami: {formatPrice(cart.total)}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                  {cart.recovery_sent ? (
                    <span style={{ padding: '8px 16px', borderRadius: '20px', background: '#ECFDF5', color: '#059669', fontSize: '14px', fontWeight: 600 }}>
                      Eslatma yuborildi
                    </span>
                  ) : (
                    <button
                      onClick={() => sendReminder(cart.id)}
                      style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: 'var(--primary)', color: 'white', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                      <Send size={18} />
                      Eslatma yuborish
                    </button>
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

export default AbandonedCarts;
