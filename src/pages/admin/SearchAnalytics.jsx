import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, TrendingUp, TrendingDown, Filter, BarChart3 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const SearchAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [searchData, setSearchData] = useState(null);
  const [timeRange, setTimeRange] = useState('7d'); // 7d, 30d, 90d

  useEffect(() => {
    const fetchSearchAnalytics = async () => {
      try {
        // Mock data - would come from API
        setSearchData({
          totalSearches: 15420,
          uniqueSearches: 8930,
          avgResults: 12.5,
          topKeywords: [
            { keyword: 'iphone 14', searches: 520, trend: '+15%', results: 45, conversions: 89 },
            { keyword: 'airpods', searches: 230, trend: '+8%', results: 32, conversions: 45 },
            { keyword: 'macbook', searches: 185, trend: '+22%', results: 28, conversions: 38 },
            { keyword: 'samsung', searches: 165, trend: '-5%', results: 56, conversions: 32 },
            { keyword: 'xiaomi', searches: 145, trend: '+12%', results: 42, conversions: 28 },
            { keyword: 'watch', searches: 120, trend: '+18%', results: 38, conversions: 25 },
            { keyword: 'tablet', searches: 98, trend: '+5%', results: 24, conversions: 18 },
            { keyword: 'headphones', searches: 87, trend: '+10%', results: 35, conversions: 15 },
            { keyword: 'charger', searches: 76, trend: '-3%', results: 28, conversions: 12 },
            { keyword: 'case', searches: 65, trend: '+7%', results: 52, conversions: 10 }
          ],
          noResults: [
            { keyword: 'iphone 15', searches: 45, trend: '+25%' },
            { keyword: 'ps5', searches: 38, trend: '+18%' },
            { keyword: 'nintendo switch', searches: 32, trend: '+12%' },
            { keyword: 'gopro', searches: 28, trend: '+8%' },
            { keyword: 'dji drone', searches: 22, trend: '+5%' }
          ],
          dailyTrend: [
            { date: 'Dush', searches: 1850 },
            { date: 'Sesh', searches: 2100 },
            { date: 'Chor', searches: 1950 },
            { date: 'Pay', searches: 2300 },
            { date: 'Juma', searches: 2800 },
            { date: 'Shan', searches: 2450 },
            { date: 'Yak', searches: 1970 }
          ]
        });
      } catch (err) {
        console.error('Failed to fetch search analytics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchAnalytics();
  }, [timeRange]);

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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px' }}>Qidirish statistikasi</h1>
            <p style={{ color: 'var(--text-muted)' }}>Foydalanuvchilar nima qidiryapti</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['7d', '30d', '90d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '10px',
                  border: 'none',
                  background: timeRange === range ? 'var(--primary)' : '#f1f5f9',
                  color: timeRange === range ? 'white' : 'var(--text-main)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: '0.3s'
                }}
              >
                {range === '7d' ? '7 kun' : range === '30d' ? '30 kun' : '90 kun'}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <Search size={24} color="#3B82F6" />
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Jami qidirishlar</span>
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: 800, margin: 0 }}>{searchData?.totalSearches || 0}</h3>
          </div>

          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <Filter size={24} color="#10B981" />
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Unikal qidirishlar</span>
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: 800, margin: 0 }}>{searchData?.uniqueSearches || 0}</h3>
          </div>

          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <BarChart3 size={24} color="#F59E0B" />
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>O\'rtacha natijalar</span>
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: 800, margin: 0 }}>{searchData?.avgResults || 0}</h3>
          </div>

          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <TrendingUp size={24} color="#8B5CF6" />
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Konversiya</span>
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: 800, margin: 0 }}>5.8%</h3>
          </div>
        </div>

        {/* Daily Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '32px' }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>Kunlik qidirish trendi</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={searchData?.dailyTrend || []}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                <Tooltip />
                <Line type="monotone" dataKey="searches" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Top Keywords */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>Eng ko'p qidirilgan so'zlar</h3>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>So'z</th>
                    <th>Qidirishlar</th>
                    <th>Trend</th>
                    <th>Natijalar</th>
                    <th>Konversiya</th>
                  </tr>
                </thead>
                <tbody>
                  {searchData?.topKeywords?.map((item, index) => (
                    <tr key={index}>
                      <td style={{ fontWeight: 700 }}>{item.keyword}</td>
                      <td>{item.searches}</td>
                      <td>
                        <span style={{ color: item.trend.startsWith('+') ? '#10B981' : '#EF4444', fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          {item.trend.startsWith('+') ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                          {item.trend}
                        </span>
                      </td>
                      <td>{item.results}</td>
                      <td>{item.conversions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>Natija yo'q</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {searchData?.noResults?.map((item, index) => (
                <div key={index} style={{ padding: '12px', background: '#FEF2F2', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600 }}>{item.keyword}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{item.searches} qidirish</span>
                    <span style={{ color: '#EF4444', fontWeight: 600, fontSize: '12px' }}>{item.trend}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SearchAnalytics;
