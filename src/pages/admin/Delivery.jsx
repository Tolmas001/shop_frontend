import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Truck, Package as PackageIcon, CheckCircle, XCircle, Clock, MapPin, Search, Filter } from 'lucide-react';
import { orders } from '../../api';
import { useApp } from '../../context/AppContext';

const Delivery = () => {
  const { formatPrice, backendUrl } = useApp();
  const [loading, setLoading] = useState(true);
  const [deliveries, setDeliveries] = useState([]);
  const [filter, setFilter] = useState('all'); // all, processing, packed, shipped, delivered, cancelled
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const res = await orders.getAdmin();
        const ordersData = res.data || [];
        setDeliveries(ordersData.map(o => ({
          ...o,
          deliveryStatus: o.delivery_status || ['processing', 'packed', 'shipped', 'delivered', 'cancelled'][Math.floor(Math.random() * 5)],
          trackingNumber: o.tracking_number || `TRK${Math.random().toString(36).substr(2, 9).toUpperCase()}`
        })));
      } catch (err) {
        console.error('Failed to fetch deliveries:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDeliveries();
  }, []);

  const filteredDeliveries = deliveries.filter(d => {
    const matchesSearch = d.customer_name?.toLowerCase().includes(search.toLowerCase()) || 
                         d.id?.toString().includes(search);
    const matchesFilter = filter === 'all' || d.deliveryStatus === filter;
    return matchesSearch && matchesFilter;
  });

  const updateDeliveryStatus = async (orderId, newStatus) => {
    try {
      await orders.updateStatus(orderId, newStatus);
      setDeliveries(deliveries.map(d => d.id === orderId ? { ...d, deliveryStatus: newStatus } : d));
    } catch (err) {
      console.error('Failed to update delivery status:', err);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      processing: '#F59E0B',
      packed: '#3B82F6',
      shipped: '#8B5CF6',
      delivered: '#10B981',
      cancelled: '#EF4444'
    };
    return colors[status] || '#94A3B8';
  };

  const getStatusIcon = (status) => {
    const icons = {
      processing: Clock,
      packed: PackageIcon,
      shipped: Truck,
      delivered: CheckCircle,
      cancelled: XCircle
    };
    return icons[status] || PackageIcon;
  };

  const getStatusSteps = (status) => {
    const steps = [
      { key: 'processing', label: 'Qayta ishlash' },
      { key: 'packed', label: 'Qadoqlangan' },
      { key: 'shipped', label: 'Yo\'lda' },
      { key: 'delivered', label: 'Yetkazib berildi' }
    ];
    
    const currentIndex = steps.findIndex(s => s.key === status);
    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      current: index === currentIndex
    }));
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
        <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px' }}>Yetkazib berish boshqaruvi</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Buyurtma yetkazib berish holatini kuzatish</p>

        {/* Filters */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '16px', border: '1px solid #f1f1f1', marginBottom: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            <input
              type="text"
              placeholder="Buyurtma qidirish..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['all', 'processing', 'packed', 'shipped', 'delivered', 'cancelled'].map((f) => (
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
                {f === 'all' ? 'Barchasi' : f === 'processing' ? 'Qayta ishlash' : f === 'packed' ? 'Qadoqlangan' : f === 'shipped' ? 'Yo\'lda' : f === 'delivered' ? 'Yetkazildi' : 'Bekor qilindi'}
              </button>
            ))}
          </div>
        </div>

        {/* Deliveries List */}
        <div style={{ display: 'grid', gap: '20px' }}>
          {filteredDeliveries.map((delivery) => {
            const StatusIcon = getStatusIcon(delivery.deliveryStatus);
            const statusSteps = getStatusSteps(delivery.deliveryStatus);
            
            return (
              <motion.div
                key={delivery.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <div style={{ width: '48px', height: '48px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Truck size={24} color="#3B82F6" />
                      </div>
                      <div>
                        <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>Order #{delivery.id}</h3>
                        <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>{delivery.customer_name}</p>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '16px' }}>
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Summa</label>
                        <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--primary)' }}>{formatPrice(delivery.total)}</span>
                      </div>
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Tracking</label>
                        <span style={{ fontSize: '14px', fontWeight: 600, fontFamily: 'monospace' }}>{delivery.trackingNumber}</span>
                      </div>
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Manzil</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <MapPin size={14} color="var(--text-muted)" />
                          <span style={{ fontSize: '14px', fontWeight: 600 }}>{delivery.customer_address || 'Toshkent'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '20px', background: `${getStatusColor(delivery.deliveryStatus)}20` }}>
                    <StatusIcon size={18} color={getStatusColor(delivery.deliveryStatus)} />
                    <span style={{ fontWeight: 700, color: getStatusColor(delivery.deliveryStatus), fontSize: '14px' }}>
                      {delivery.deliveryStatus === 'processing' ? 'Qayta ishlash' : 
                       delivery.deliveryStatus === 'packed' ? 'Qadoqlangan' :
                       delivery.deliveryStatus === 'shipped' ? 'Yo\'lda' :
                       delivery.deliveryStatus === 'delivered' ? 'Yetkazildi' : 'Bekor qilindi'}
                    </span>
                  </div>
                </div>

                {/* Status Timeline */}
                {delivery.deliveryStatus !== 'cancelled' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', padding: '16px', background: '#f8fafc', borderRadius: '12px' }}>
                    {statusSteps.map((step, index) => (
                      <React.Fragment key={step.key}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                          <div style={{ 
                            width: '32px', height: '32px', borderRadius: '50%', 
                            background: step.completed ? getStatusColor(delivery.deliveryStatus) : '#e2e8f0',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            marginBottom: '8px'
                          }}>
                            {step.completed && <CheckCircle size={16} color="white" />}
                          </div>
                          <span style={{ fontSize: '12px', fontWeight: step.current ? 700 : 500, color: step.current ? getStatusColor(delivery.deliveryStatus) : 'var(--text-muted)' }}>
                            {step.label}
                          </span>
                        </div>
                        {index < statusSteps.length - 1 && (
                          <div style={{ flex: 1, height: '2px', background: step.completed ? getStatusColor(delivery.deliveryStatus) : '#e2e8f0' }} />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                )}

                {/* Status Update Buttons */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {delivery.deliveryStatus === 'processing' && (
                    <button
                      onClick={() => updateDeliveryStatus(delivery.id, 'packed')}
                      style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: '#3B82F6', color: 'white', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Qadoqlash
                    </button>
                  )}
                  {delivery.deliveryStatus === 'packed' && (
                    <button
                      onClick={() => updateDeliveryStatus(delivery.id, 'shipped')}
                      style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: '#8B5CF6', color: 'white', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Yo\'lga chiqarish
                    </button>
                  )}
                  {delivery.deliveryStatus === 'shipped' && (
                    <button
                      onClick={() => updateDeliveryStatus(delivery.id, 'delivered')}
                      style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: '#10B981', color: 'white', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Yetkazib berildi
                    </button>
                  )}
                  {delivery.deliveryStatus !== 'cancelled' && delivery.deliveryStatus !== 'delivered' && (
                    <button
                      onClick={() => updateDeliveryStatus(delivery.id, 'cancelled')}
                      style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: '#EF4444', color: 'white', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Bekor qilish
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default Delivery;
