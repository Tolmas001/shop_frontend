import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, TrendingDown, AlertTriangle, Sparkles, RefreshCw } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const AI = () => {
  const { formatPrice } = useApp();
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState(null);

  useEffect(() => {
    const fetchAIRecommendations = async () => {
      try {
        // Mock data - would come from AI API
        setRecommendations({
          trendingProducts: [
            { id: 1, name: 'iPhone 14 Pro', reason: 'Sotuvlar 45% oshdi', action: 'increase', confidence: 92 },
            { id: 2, name: 'AirPods Pro', reason: 'Yozgi mavsumga tayyor', action: 'stock', confidence: 88 },
            { id: 3, name: 'MacBook Air', reason: 'Talab yuqori', action: 'maintain', confidence: 75 }
          ],
          priceSuggestions: [
            { id: 1, name: 'Samsung Galaxy S23', currentPrice: 11000000, suggestedPrice: 10500000, reason: 'Raqobatchilar narxni tushirdi', action: 'decrease' },
            { id: 2, name: 'Sony WH-1000XM5', currentPrice: 4500000, suggestedPrice: 4800000, reason: 'Talab oshmoqda', action: 'increase' },
            { id: 3, name: 'iPad Pro', currentPrice: 7500000, suggestedPrice: 7200000, reason: 'Yangi model chiqishi yaqin', action: 'decrease' }
          ],
          categoryInsights: [
            { category: 'Telefonlar', growth: '+25%', trend: 'up', recommendation: 'Ko\'proq assortiment qo\'shing' },
            { category: 'Aksessuarlar', growth: '+18%', trend: 'up', recommendation: 'Promo kodlar ishlating' },
            { category: 'Kompyuterlar', growth: '-5%', trend: 'down', recommendation: 'Narxlarni tushiring' },
            { category: 'Smart soatlar', growth: '+32%', trend: 'up', recommendation: 'Yangi brendlar qo\'shing' }
          ],
          inventoryAlerts: [
            { product: 'iPhone 14 Pro', currentStock: 15, predictedDemand: 50, urgency: 'high' },
            { product: 'AirPods Pro', currentStock: 45, predictedDemand: 60, urgency: 'medium' },
            { product: 'MacBook Air', currentStock: 8, predictedDemand: 30, urgency: 'high' }
          ]
        });
      } catch (err) {
        console.error('Failed to fetch AI recommendations:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAIRecommendations();
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px' }}>AI Tavsiyalar</h1>
            <p style={{ color: 'var(--text-muted)' }}>Sun'iy intellekt asosidagi tavsiyalar</p>
          </div>
          <button
            style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: '#f1f5f9', color: 'var(--text-main)', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <RefreshCw size={18} />
            Yangilash
          </button>
        </div>

        {/* Trending Products */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '24px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <Sparkles size={24} color="#8B5CF6" />
            <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>Trend mahsulotlar</h3>
          </div>
          <div style={{ display: 'grid', gap: '16px' }}>
            {recommendations?.trendingProducts?.map((product) => (
              <div key={product.id} style={{ padding: '16px', background: '#f8fafc', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '4px' }}>{product.name}</h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>{product.reason}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Ishonch</div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: '#8B5CF6' }}>{product.confidence}%</div>
                  </div>
                  <div style={{ padding: '8px 16px', borderRadius: '20px', background: product.action === 'increase' ? '#ECFDF5' : '#FEF3C7', color: product.action === 'increase' ? '#059669' : '#D97706', fontSize: '14px', fontWeight: 700 }}>
                    {product.action === 'increase' ? 'Narx oshirish' : product.action === 'stock' ? 'Zaxira oshirish' : 'Saqlash'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Price Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '24px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <TrendingUp size={24} color="#3B82F6" />
            <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>Narx tavsiyalari</h3>
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Mahsulot</th>
                  <th>Hozirgi narx</th>
                  <th>Tavsiya etilgan</th>
                  <th>Sabab</th>
                  <th>Amal</th>
                </tr>
              </thead>
              <tbody>
                {recommendations?.priceSuggestions?.map((item) => (
                  <tr key={item.id}>
                    <td style={{ fontWeight: 700 }}>{item.name}</td>
                    <td>{formatPrice(item.currentPrice)}</td>
                    <td style={{ fontWeight: 700, color: item.action === 'increase' ? '#10B981' : '#EF4444' }}>{formatPrice(item.suggestedPrice)}</td>
                    <td style={{ fontSize: '14px' }}>{item.reason}</td>
                    <td>
                      <span style={{ padding: '6px 12px', borderRadius: '20px', background: item.action === 'increase' ? '#ECFDF5' : '#FEF2F2', color: item.action === 'increase' ? '#059669' : '#DC2626', fontSize: '12px', fontWeight: 700 }}>
                        {item.action === 'increase' ? 'Oshirish' : 'Tushirish'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Category Insights */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <TrendingUp size={24} color="#10B981" />
              <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>Kategoriya tahlili</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recommendations?.categoryInsights?.map((item) => (
                <div key={item.category} style={{ padding: '16px', background: '#f8fafc', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 700 }}>{item.category}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: item.trend === 'up' ? '#10B981' : '#EF4444', fontWeight: 700 }}>
                      {item.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                      {item.growth}
                    </span>
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>{item.recommendation}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <AlertTriangle size={24} color="#F59E0B" />
              <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>Ombor ogohlantirishlari</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recommendations?.inventoryAlerts?.map((item) => (
                <div key={item.product} style={{ padding: '16px', background: item.urgency === 'high' ? '#FEF2F2' : '#FEF3C7', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 700 }}>{item.product}</span>
                    <span style={{ padding: '4px 12px', borderRadius: '20px', background: item.urgency === 'high' ? '#DC2626' : '#D97706', color: 'white', fontSize: '12px', fontWeight: 700 }}>
                      {item.urgency === 'high' ? 'Yuqori' : 'O\'rtacha'}
                    </span>
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                    Hozirgi: {item.currentStock} | Bashorat: {item.predictedDemand}
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

export default AI;
