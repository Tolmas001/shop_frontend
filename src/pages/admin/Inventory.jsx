import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, AlertTriangle, Search, Filter, ArrowDown, ArrowUp } from 'lucide-react';
import { products } from '../../api';
import { useApp } from '../../context/AppContext';

const Inventory = () => {
  const { formatPrice, backendUrl } = useApp();
  const [loading, setLoading] = useState(true);
  const [inventory, setInventory] = useState([]);
  const [filter, setFilter] = useState('all'); // all, low, out
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await products.getAll();
        const productsData = res.data || [];
        setInventory(productsData.map(p => ({
          ...p,
          stock: p.stock || Math.floor(Math.random() * 100),
          lowStockThreshold: 10
        })));
      } catch (err) {
        console.error('Failed to fetch inventory:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, []);

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || 
      (filter === 'low' && item.stock > 0 && item.stock <= item.lowStockThreshold) ||
      (filter === 'out' && item.stock === 0);
    return matchesSearch && matchesFilter;
  });

  const lowStockCount = inventory.filter(i => i.stock > 0 && i.stock <= i.lowStockThreshold).length;
  const outOfStockCount = inventory.filter(i => i.stock === 0).length;

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
        <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px' }}>Ombor nazorati</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Mahsulotlar qoldig'ini kuzatish</p>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <Package size={24} color="#3B82F6" />
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Jami mahsulotlar</span>
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: 800, margin: 0 }}>{inventory.length}</h3>
          </div>

          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <AlertTriangle size={24} color="#F59E0B" />
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Kam qolgan</span>
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: 800, margin: 0, color: '#F59E0B' }}>{lowStockCount}</h3>
          </div>

          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <AlertTriangle size={24} color="#EF4444" />
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Tugab qolgan</span>
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: 800, margin: 0, color: '#EF4444' }}>{outOfStockCount}</h3>
          </div>
        </div>

        {/* Filters */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '16px', border: '1px solid #f1f1f1', marginBottom: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            <input
              type="text"
              placeholder="Mahsulot qidirish..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['all', 'low', 'out'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '10px',
                  border: 'none',
                  background: filter === f ? 'var(--primary)' : '#f1f5f9',
                  color: filter === f ? 'white' : 'var(--text-main)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: '0.3s'
                }}
              >
                {f === 'all' ? 'Barchasi' : f === 'low' ? 'Kam qolgan' : 'Tugab qolgan'}
              </button>
            ))}
          </div>
        </div>

        {/* Inventory Table */}
        <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Mahsulot</th>
                  <th>Kategoriya</th>
                  <th>Narx</th>
                  <th>Qoldiq</th>
                  <th>Holat</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((item) => {
                  const isLow = item.stock > 0 && item.stock <= item.lowStockThreshold;
                  const isOut = item.stock === 0;
                  
                  return (
                    <tr key={item.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img
                            src={item.image?.startsWith('http') ? item.image : `${backendUrl}${item.image}`}
                            alt={item.name}
                            style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }}
                          />
                          <div>
                            <div style={{ fontWeight: 600 }}>{item.name}</div>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>ID: {item.id}</div>
                          </div>
                        </div>
                      </td>
                      <td>{item.category_name || '-'}</td>
                      <td style={{ fontWeight: 700 }}>{formatPrice(item.price)}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: 700, fontSize: '18px' }}>{item.stock}</span>
                          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>dona</span>
                        </div>
                      </td>
                      <td>
                        {isOut ? (
                          <span style={{ padding: '6px 12px', borderRadius: '20px', background: '#FEF2F2', color: '#DC2626', fontSize: '12px', fontWeight: 600 }}>
                            Tugab qolgan
                          </span>
                        ) : isLow ? (
                          <span style={{ padding: '6px 12px', borderRadius: '20px', background: '#FFFBEB', color: '#D97706', fontSize: '12px', fontWeight: 600 }}>
                            Kam qolgan
                          </span>
                        ) : (
                          <span style={{ padding: '6px 12px', borderRadius: '20px', background: '#ECFDF5', color: '#059669', fontSize: '12px', fontWeight: 600 }}>
                            Mavjud
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Inventory;
