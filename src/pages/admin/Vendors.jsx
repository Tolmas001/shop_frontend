import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Store, DollarSign, Package, CheckCircle, XCircle, Search, Filter, TrendingUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Vendors = () => {
  const { formatPrice, backendUrl } = useApp();
  const [loading, setLoading] = useState(true);
  const [vendors, setVendors] = useState([]);
  const [filter, setFilter] = useState('all'); // all, pending, approved, rejected
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        // Mock data - would come from API
        const mockVendors = [
          { id: 1, name: 'TechStore LLC', email: 'techstore@example.com', products: 45, earnings: 45000000, status: 'approved', joined_at: '2024-01-10', rating: 4.8 },
          { id: 2, name: 'Mobile World', email: 'mobileworld@example.com', products: 32, earnings: 32000000, status: 'approved', joined_at: '2024-01-08', rating: 4.5 },
          { id: 3, name: 'Electronics Hub', email: 'electronicshub@example.com', products: 0, earnings: 0, status: 'pending', joined_at: '2024-01-15', rating: 0 },
          { id: 4, name: 'Gadget Pro', email: 'gadgetpro@example.com', products: 28, earnings: 28000000, status: 'approved', joined_at: '2024-01-05', rating: 4.7 },
          { id: 5, name: 'Smart Devices', email: 'smartdevices@example.com', products: 0, earnings: 0, status: 'rejected', joined_at: '2024-01-12', rating: 0 }
        ];
        setVendors(mockVendors);
      } catch (err) {
        console.error('Failed to fetch vendors:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchVendors();
  }, []);

  const filteredVendors = vendors.filter(v => {
    const matchesSearch = v.name?.toLowerCase().includes(search.toLowerCase()) || 
                         v.email?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || v.status === filter;
    return matchesSearch && matchesFilter;
  });

  const approveVendor = async (vendorId) => {
    try {
      // Would call API to approve vendor
      setVendors(vendors.map(v => v.id === vendorId ? { ...v, status: 'approved' } : v));
    } catch (err) {
      console.error('Failed to approve vendor:', err);
    }
  };

  const rejectVendor = async (vendorId) => {
    try {
      // Would call API to reject vendor
      setVendors(vendors.map(v => v.id === vendorId ? { ...v, status: 'rejected' } : v));
    } catch (err) {
      console.error('Failed to reject vendor:', err);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#F59E0B',
      approved: '#10B981',
      rejected: '#EF4444'
    };
    return colors[status] || '#94A3B8';
  };

  if (loading) {
    return (
      <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loader"></div>
      </div>
    );
  }

  const totalEarnings = vendors.reduce((sum, v) => sum + v.earnings, 0);
  const totalProducts = vendors.reduce((sum, v) => sum + v.products, 0);

  return (
    <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px' }}>Vendor System</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Marketplace sellerlarni boshqarish</p>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <Store size={24} color="#3B82F6" />
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Jami vendorlar</span>
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: 800, margin: 0 }}>{vendors.length}</h3>
          </div>

          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <Package size={24} color="#10B981" />
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Jami mahsulotlar</span>
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: 800, margin: 0 }}>{totalProducts}</h3>
          </div>

          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <DollarSign size={24} color="#F59E0B" />
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Jami daromad</span>
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: 800, margin: 0 }}>{formatPrice(totalEarnings)}</h3>
          </div>

          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <TrendingUp size={24} color="#8B5CF6" />
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Kutilmoqda</span>
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: 800, margin: 0, color: '#F59E0B' }}>{vendors.filter(v => v.status === 'pending').length}</h3>
          </div>
        </div>

        {/* Filters */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '16px', border: '1px solid #f1f1f1', marginBottom: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            <input
              type="text"
              placeholder="Vendor qidirish..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['all', 'pending', 'approved', 'rejected'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '10px 16px',
                  borderRadius: '10px',
                  border: 'none',
                  background: filter === f ? 'var(--primary)' : '#f1f5f9',
                  color: filter === f ? 'white' : 'var(--text-main)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: '0.3s',
                  fontSize: '14px'
                }}
              >
                {f === 'all' ? 'Barchasi' : f === 'pending' ? 'Kutilmoqda' : f === 'approved' ? 'Tasdiqlangan' : 'Rad etilgan'}
              </button>
            ))}
          </div>
        </div>

        {/* Vendors List */}
        <div style={{ display: 'grid', gap: '16px' }}>
          {filteredVendors.map((vendor) => (
            <motion.div
              key={vendor.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '20px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ width: '48px', height: '48px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Store size={24} color="#3B82F6" />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>{vendor.name}</h3>
                      <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>{vendor.email}</p>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Mahsulotlar</label>
                      <span style={{ fontSize: '16px', fontWeight: 700 }}>{vendor.products}</span>
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Daromad</label>
                      <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--primary)' }}>{formatPrice(vendor.earnings)}</span>
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Reyting</label>
                      <span style={{ fontSize: '16px', fontWeight: 700 }}>{vendor.rating > 0 ? `${vendor.rating} ⭐` : '-'}</span>
                    </div>
                  </div>

                  <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                    Qo'shilgan: {new Date(vendor.joined_at).toLocaleDateString('uz-UZ')}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                  <div style={{ padding: '6px 12px', borderRadius: '20px', background: `${getStatusColor(vendor.status)}20`, color: getStatusColor(vendor.status), fontSize: '12px', fontWeight: 700 }}>
                    {vendor.status === 'pending' ? 'Kutilmoqda' : vendor.status === 'approved' ? 'Tasdiqlangan' : 'Rad etilgan'}
                  </div>
                  
                  {vendor.status === 'pending' && (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => approveVendor(vendor.id)}
                        style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: '#10B981', color: 'white', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                      >
                        <CheckCircle size={18} />
                        Tasdiqlash
                      </button>
                      <button
                        onClick={() => rejectVendor(vendor.id)}
                        style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: '#EF4444', color: 'white', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                      >
                        <XCircle size={18} />
                        Rad etish
                      </button>
                    </div>
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

export default Vendors;
