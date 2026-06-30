import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, ShoppingCart, Users, Calendar, ArrowUp, ArrowDown } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { stats } from '../../api';
import { useApp } from '../../context/AppContext';

const Analytics = () => {
  const { formatPrice } = useApp();
  const [dateRange, setDateRange] = useState('7d'); // 7d, 30d, 1y
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // This would call a dedicated analytics API endpoint
        // For now, using existing stats endpoint
        const res = await stats.get();
        setAnalyticsData({
          totalRevenue: res.data?.revenue || 0,
          totalOrders: res.data?.orders || 0,
          totalUsers: res.data?.users || 0,
          conversionRate: 3.2,
          salesTrend: [
            { date: 'Mon', sales: 12000, orders: 15 },
            { date: 'Tue', sales:'000, orders: 23 },
            { date: 'Wed', sales: 15000, orders: 18 },
            { date: 'Thu', sales: 22000, orders: 28 },
            { date: 'Fri', sales: 28000, orders: 35 },
            { date: 'Sat', sales: 35000, orders: 42 },
            { date: 'Sun', sales: 31000, orders: 38 }
          ],
          topProducts: [
            { name: 'iPhone 14 Pro', sales: 156, revenue: 156000000 },
            { name: 'AirPods Pro', sales: 234, revenue: 58500000 },
            { name: 'MacBook Air', sales: 89, revenue: 89450000 },
            { name: 'Apple Watch', sales: 145, revenue: 43500000 },
            { name: 'iPad Pro', sales: 67, revenue: 50250000 }
          ],
          categoryDistribution: [
            { name: 'Telefonlar', value: 45 },
            { name: 'Aksessuarlar', value: 25 },
            { name: 'Kompyuterlar', value: 20 },
            { name: 'Boshqa', value: 10 }
          ]
        });
      } catch (err) {
        console.error('Failed to fetch analytics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [dateRange]);

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  if (loading) {
    return (
      <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loader"></div>
      </div>
    );
  }

  const revenueChange = 12.5;
  const ordersChange = 8.3;
  const usersChange = 15.2;
  const conversionChange = 2.1;

  return (
    <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px' }}>Analytics</h1>
            <p style={{ color: 'var(--text-muted)' }}>Sotuv statistikasi va tahlillar</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['7d', '30d', '1y'].map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '10px',
                  border: 'none',
                  background: dateRange === range ? 'var(--primary)' : '#f1f5f9',
                  color: dateRange === range ? 'white' : 'var(--text-main)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: '0.3s'
                }}
              >
                {range === '7d' ? '7 kun' : range === '30d' ? '30 kun' : '1 yil'}
              </button>
            ))}
          </div>
        </div>

        {/* Revenue Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <DollarSign size={24} color="#10B981" />
              </div>
              <div>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>Jami daromad</p>
                <h3 style={{ fontSize: '24px', fontWeight: 800, margin: 0 }}>{formatPrice(analyticsData?.totalRevenue || 0)}</h3>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: revenueChange > 0 ? '#10B981' : '#EF4444', fontSize: '14px', fontWeight: 600 }}>
              {revenueChange > 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
              {Math.abs(revenueChange)}% o'tgan davrga nisbatan
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShoppingCart size={24} color="#3B82F6" />
              </div>
              <div>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>Buyurtmalar</p>
                <h3 style={{ fontSize: '24px', fontWeight: 800, margin: 0 }}>{analyticsData?.totalOrders || 0}</h3>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: ordersChange > 0 ? '#10B981' : '#EF4444', fontSize: '14px', fontWeight: 600 }}>
              {ordersChange > 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
              {Math.abs(ordersChange)}% o'tgan davrga nisbatan
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={24} color="#8B5CF6" />
              </div>
              <div>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>Foydalanuvchilar</p>
                <h3 style={{ fontSize: '24px', fontWeight: 800, margin: 0 }}>{analyticsData?.totalUsers || 0}</h3>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: usersChange > 0 ? '#10B981' : '#EF4444', fontSize: '14px', fontWeight: 600 }}>
              {usersChange > 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
              {Math.abs(usersChange)}% o'tgan davrga nisbatan
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TrendingUp size={24} color="#F59E0B" />
              </div>
              <div>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>Conversion rate</p>
                <h3 style={{ fontSize: '24px', fontWeight: 800, margin: 0 }}>{analyticsData?.conversionRate || 0}%</h3>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: conversionChange > 0 ? '#10B981' : '#EF4444', fontSize: '14px', fontWeight: 600 }}>
              {conversionChange > 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
              {Math.abs(conversionChange)}% o'tgan davrga nisbatan
            </div>
          </motion.div>
        </div>

        {/* Charts */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '32px' }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>Sotuv trendi</h3>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analyticsData?.salesTrend || []}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="sales" stroke="#3B82F6" fillOpacity={1} fill="url(#colorSales)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>Kategoriyalar bo'yicha</h3>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analyticsData?.categoryDistribution || []}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {(analyticsData?.categoryDistribution || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: 700', marginBottom: '20px' }}>Eng ko'p sotilgan mahsulotlar</h3>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Mahsulot</th>
                  <th>Sotilgan</th>
                  <th>Daromad</th>
                  <th>O'sish</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData?.topProducts?.map((product, index) => (
                  <tr key={index}>
                    <td style={{ fontWeight: 600 }}>{product.name}</td>
                    <td>{product.sales} dona</td>
                    <td style={{ fontWeight: 700 }}>{formatPrice(product.revenue)}</td>
                    <td>
                      <span style={{ color: '#10B981', fontWeight: 600, fontSize: '14px' }}>
                        +{Math.floor(Math.random() * 20 + 5)}%
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

export default Analytics;
