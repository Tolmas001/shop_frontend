import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, TrendingUp, Users, Package as PackageIcon, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const WishlistAnalytics = () => {
  const { formatPrice, backendUrl } = useApp();
  const [loading, setLoading] = useState(true);
  const [wishlistData, setWishlistData] = useState(null);

  useEffect(() => {
    const fetchWishlistAnalytics = async () => {
      try {
        // Mock data - would come from API
        setWishlistData({
          totalWishlists: 850,
          totalItems: 3200,
          conversionRate: 12.5,
          topProducts: [
            { id: 1, name: 'iPhone 14 Pro', price: 12000000, saves: 156, conversions: 45, image: 'https://example.com/iphone.jpg' },
            { id: 2, name: 'AirPods Pro', price: 2500000, saves: 234, conversions: 52, image: 'https://example.com/airpods.jpg' },
            { id: 3, name: 'MacBook Air', price: 15000000, saves: 189, conversions: 38, image: 'https://example.com/macbook.jpg' },
            { id: 4, name: 'Apple Watch', price: 3000000, saves: 145, conversions: 28, image: 'https://example.com/watch.jpg' },
            { id: 5, name: 'iPad Pro', price: 7500000, saves: 120, conversions: 22, image: 'https://example.com/ipad.jpg' },
            { id: 6, name: 'Samsung Galaxy S23', price: 11000000, saves: 98, conversions: 18, image: 'https://example.com/samsung.jpg' },
            { id: 7, name: 'Sony WH-1000XM5', price: 4500000, saves: 87, conversions: 15, image: 'https://example.com/sony.jpg' },
            { id: 8, name: 'Nintendo Switch', price: 6000000, saves: 76, conversions: 12, image: 'https://example.com/nintendo.jpg' }
          ],
          monthlyTrend: [
            { month: 'Yan', saves: 420 },
            { month: 'Fev', saves: 580 },
            { month: 'Mar', saves: 490 },
            { month: 'Apr', saves: 620 },
            { month: 'May', saves: 750 },
            { month: 'Iyun', saves: 890 }
          ]
        });
      } catch (err) {
        console.error('Failed to fetch wishlist analytics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlistAnalytics();
  }, []);

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
        <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px' }}>Wishlist statistikasi</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Eng ko'p wishlistga qo'shilgan mahsulotlar</p>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <Heart size={24} color="#EF4444" />
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Jami wishlistlar</span>
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: 800, margin: 0 }}>{wishlistData?.totalWishlists || 0}</h3>
          </div>

          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <PackageIcon size={24} color="#3B82F6" />
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Jami mahsulotlar</span>
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: 800, margin: 0 }}>{wishlistData?.totalItems || 0}</h3>
          </div>

          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <TrendingUp size={24} color="#10B981" />
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Conversion rate</span>
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: 800, margin: 0 }}>{wishlistData?.conversionRate || 0}%</h3>
          </div>

          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <Users size={24} color="#8B5CF6" />
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>O'rtacha savolar</span>
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: 800, margin: 0 }}>{Math.round((wishlistData?.totalItems || 0) / (wishlistData?.totalWishlists || 1))}</h3>
          </div>
        </div>

        {/* Monthly Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '32px' }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>Oylik wishlist trendi</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={wishlistData?.monthlyTrend || []}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                <Tooltip />
                <Bar dataKey="saves" fill="#EF4444" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>Eng ko'p wishlistga qo'shilgan mahsulotlar</h3>
          <div style={{ display: 'grid', gap: '16px' }}>
            {wishlistData?.topProducts?.map((product, index) => (
              <div
                key={product.id}
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'auto 1fr auto', 
                  gap: '16px', 
                  padding: '16px', 
                  background: '#f8fafc', 
                  borderRadius: '12px',
                  alignItems: 'center'
                }}
              >
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#EF4444', width: '40px', textAlign: 'center' }}>
                  #{index + 1}
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '4px' }}>{product.name}</h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>{formatPrice(product.price)}</p>
                </div>
                <div style={{ display: 'flex', gap: '24px', textAlign: 'right' }}>
                  <div>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: '#EF4444' }}>{product.saves}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Saves</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: '#10B981' }}>{product.conversions}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Konversiya</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: '#3B82F6' }}>
                      {((product.conversions / product.saves) * 100).toFixed(1)}%
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Rate</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WishlistAnalytics;
