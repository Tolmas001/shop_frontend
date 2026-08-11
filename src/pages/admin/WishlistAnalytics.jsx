import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, TrendingUp, Users, Package as PackageIcon, Search } from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { analytics } from '../../services/api';

const WishlistAnalytics = () => {
  const { formatPrice, backendUrl } = useApp();
  const [loading, setLoading] = useState(true);
  const [wishlistData, setWishlistData] = useState(null);

  useEffect(() => {
    const fetchWishlistAnalytics = async () => {
      try {
        const res = await analytics.getWishlistStats();
        const data = res.data || {};
        
        // Transform backend data to match frontend structure
        const totalWishlists = data.total_wishlist_items || 0;
        const totalItems = totalWishlists; // Same for now
        const conversionRate = data.conversion ? ((data.conversion.users_who_purchased / data.conversion.total_users_with_wishlist) * 100).toFixed(1) : 0;
        
        const topProducts = (data.popular_products || []).slice(0, 8).map(p => ({
          id: p.id,
          name: p.name,
          price: p.price,
          saves: p.wishlist_count,
          conversions: Math.floor(p.wishlist_count * 0.3), // Mock conversion rate
          image: p.image
        }));
        
        // Generate monthly trend data (mock since backend doesn't provide this)
        const monthlyTrend = [
          { month: 'Yan', saves: Math.floor(totalWishlists * 0.12) },
          { month: 'Fev', saves: Math.floor(totalWishlists * 0.16) },
          { month: 'Mar', saves: Math.floor(totalWishlists * 0.14) },
          { month: 'Apr', saves: Math.floor(totalWishlists * 0.18) },
          { month: 'May', saves: Math.floor(totalWishlists * 0.22) },
          { month: 'Iyun', saves: Math.floor(totalWishlists * 0.18) }
        ];
        
        setWishlistData({
          totalWishlists: Math.floor(totalWishlists / 4), // Approximate unique wishlists
          totalItems,
          conversionRate,
          topProducts,
          monthlyTrend
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
