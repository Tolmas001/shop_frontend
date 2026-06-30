import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Ticket, TrendingUp, DollarSign, Users, Search, BarChart3 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const CouponsAnalytics = () => {
  const { formatPrice } = useApp();
  const [loading, setLoading] = useState(true);
  const [couponData, setCouponData] = useState(null);

  useEffect(() => {
    const fetchCouponAnalytics = async () => {
      try {
        // Mock data - would come from API
        setCouponData({
          totalCoupons: 15,
          activeCoupons: 8,
          totalUsage: 1250,
          totalSavings: 25000000,
          topCoupons: [
            { code: 'WELCOME10', usage: 320, savings: 4800000, orders: 320 },
            { code: 'SUMMER20', usage: 280, savings: 5600000, orders: 280 },
            { code: 'FLASH50', usage: 180, savings: 4500000, orders: 180 },
            { code: 'NEWUSER15', usage: 150, savings: 2250000, orders: 150 },
            { code: 'FREESHIP', usage: 120, savings: 1200000, orders: 120 }
          ],
          monthlyUsage: [
            { month: 'Yan', usage: 85 },
            { month: 'Fev', usage: 120 },
            { month: 'Mar', usage: 95 },
            { month: 'Apr', usage: 140 },
            { month: 'May', usage: 180 },
            { month: 'Iyun', usage: 220 }
          ],
          couponTypes: [
            { name: 'Foiz', value: 45 },
            { name: 'Summa', value: 30 },
            { name: 'Bepul yetkazib berish', value: 25 }
          ]
        });
      } catch (err) {
        console.error('Failed to fetch coupon analytics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCouponAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loader"></div>
      </div>
    );
  }

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B'];

  return (
    <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px' }}>Promo kodlar statistikasi</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Promo kodlar foydalanishini tahlil qilish</p>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <Ticket size={24} color="#3B82F6" />
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Jami promo kodlar</span>
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: 800, margin: 0 }}>{couponData?.totalCoupons || 0}</h3>
          </div>

          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <TrendingUp size={24} color="#10B981" />
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Foydalanish</span>
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: 800, margin: 0 }}>{couponData?.totalUsage || 0}</h3>
          </div>

          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <DollarSign size={24} color="#F59E0B" />
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Jami tejam</span>
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: 800, margin: 0 }}>{formatPrice(couponData?.totalSavings || 0)}</h3>
          </div>

          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <Users size={24} color="#8B5CF6" />
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Faol kodlar</span>
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: 800, margin: 0 }}>{couponData?.activeCoupons || 0}</h3>
          </div>
        </div>

        {/* Charts */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '32px' }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>Oylik foydalanish</h3>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={couponData?.monthlyUsage || []}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                  <Tooltip />
                  <Bar dataKey="usage" fill="#3B82F6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>Kod turlari</h3>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={couponData?.couponTypes || []}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {(couponData?.couponTypes || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Top Coupons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>Eng ko'p ishlatilgan promo kodlar</h3>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Promo kod</th>
                  <th>Foydalanish</th>
                  <th>Buyurtmalar</th>
                  <th>Tejam</th>
                  <th>Trend</th>
                </tr>
              </thead>
              <tbody>
                {couponData?.topCoupons?.map((coupon, index) => (
                  <tr key={index}>
                    <td style={{ fontWeight: 700, color: 'var(--primary)' }}>{coupon.code}</td>
                    <td>{coupon.usage} marta</td>
                    <td>{coupon.orders} buyurtma</td>
                    <td style={{ fontWeight: 700 }}>{formatPrice(coupon.savings)}</td>
                    <td>
                      <span style={{ color: '#10B981', fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <TrendingUp size={14} />
                        +{Math.floor(Math.random() * 30 + 10)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CouponsAnalytics;
