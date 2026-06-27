import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { stats, notifications as notifyApi } from '../../api';
import AdminProducts from './Products';
import AdminCategories from './Categories';
import AdminOrders from './Orders';
import AdminUsers from './Users';
import AdminReviews from './Reviews';
import AdminManagement from './AdminManagement';
import ActivityLogs from './ActivityLogs';
import AdminPromoCodes from './PromoCodes';
import AdminAds from './Ads';

import {
  MessageSquare,
  DollarSign,
  TrendingDown,
  LayoutDashboard,
  Box,
  Layers,
  ClipboardList,
  Users,
  ArrowLeft,
  CheckCircle,
  TrendingUp,
  Heart,
  ShoppingBag,
  AlertCircle,
  Bell,
  ShieldCheck,
  History,
  Ticket,
  Image as ImageIcon
} from 'lucide-react';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';

const AdminDashboard = () => {
  const { user, loading, t } = useApp();
  const location = useLocation();
  const [statsData, setStatsData] = useState(null);
  const [broadcastForm, setBroadcastForm] = useState({ message: '', type: 'info' });
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (user?.role === 'admin' || user?.role === 'superadmin') {
      stats.get()
        .then(res => setStatsData(res.data))
        .catch(() => {});
    }
  }, [user]);

  const isActive = (path) => location.pathname === path;

  const getStatStyles = (type) => {
    const map = {
      revenue: { accent: '#10B981', bg: 'rgba(16, 185, 129, 0.1)', icon: TrendingUp },
      orders: { accent: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)', icon: ShoppingBag },
      pending: { accent: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)', icon: AlertCircle },
      products: { accent: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.1)', icon: Box },
    };
    return map[type] || map.revenue;
  };

  const statConfigs = [
    { key: 'revenue', label: 'Umumiy Daromad', value: statsData?.totalRevenue?.toLocaleString(), suffix: "so'm", type: 'revenue' },
    { key: 'orders', label: 'Buyurtmalar', value: statsData?.totalOrders, suffix: '', type: 'orders' },
    { key: 'pending', label: 'Kutilayotgan', value: statsData?.pendingOrders, suffix: '', type: 'pending' },
    { key: 'products', label: 'Mahsulotlar', value: statsData?.totalProducts, suffix: '', type: 'products' },
  ];

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="sidebar-brand-icon">
              <ShieldCheck size={22} color="white" />
            </div>
            Admin Panel
          </div>
        </div>

        <nav className="sidebar-nav">
          <Link to="/admin" className={`sidebar-item ${isActive('/admin') ? 'active' : ''}`}>
            <LayoutDashboard size={19} /> Bosh sahifa
          </Link>
          <Link to="/admin/products" className={`sidebar-item ${isActive('/admin/products') ? 'active' : ''}`}>
            <Box size={19} /> Mahsulotlar
          </Link>
          <Link to="/admin/categories" className={`sidebar-item ${isActive('/admin/categories') ? 'active' : ''}`}>
            <Layers size={19} /> Kategoriyalar
          </Link>
          <Link to="/admin/orders" className={`sidebar-item ${isActive('/admin/orders') ? 'active' : ''}`}>
            <ClipboardList size={19} /> Buyurtmalar
          </Link>
          <Link to="/admin/users" className={`sidebar-item ${isActive('/admin/users') ? 'active' : ''}`}>
            <Users size={19} /> Foydalanuvchilar
          </Link>
          <Link to="/admin/reviews" className={`sidebar-item ${isActive('/admin/reviews') ? 'active' : ''}`}>
            <MessageSquare size={19} /> Sharhlar
          </Link>
          <Link to="/admin/promo" className={`sidebar-item ${isActive('/admin/promo') ? 'active' : ''}`}>
            <Ticket size={19} /> Promo-kodlar
          </Link>
          <Link to="/admin/ads" className={`sidebar-item ${isActive('/admin/ads') ? 'active' : ''}`}>
            <ImageIcon size={19} /> Reklamalar
          </Link>

          {user?.role === 'superadmin' && (
            <>
              <div className="sidebar-divider">Super Admin</div>
              <Link to="/admin/management" className={`sidebar-item ${isActive('/admin/management') ? 'active' : ''}`}>
                <ShieldCheck size={19} /> Adminlar
              </Link>
              <Link to="/admin/logs" className={`sidebar-item ${isActive('/admin/logs') ? 'active' : ''}`}>
                <History size={19} /> Audit Loglari
              </Link>
            </>
          )}
        </nav>

        <div className="sidebar-footer">
          <Link to="/" className="sidebar-item" style={{ color: '#64748B' }}>
            <ArrowLeft size={19} /> Saytga qaytish
          </Link>
        </div>
      </aside>

      <main className="admin-content">
        <div className="container" style={{ padding: '40px 0' }}>
          <div className="admin-header" style={{ marginBottom: '36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h1 style={{ fontSize: '28px', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>Xush kelibsiz, {user?.username}</h1>
              <p style={{ color: '#64748B', marginTop: '4px', fontSize: '15px' }}>Bugungi holat va statistikani kuzatib boring.</p>
            </motion.div>
            <button
              className="btn btn-secondary"
              style={{ borderRadius: '14px', fontSize: '14px', padding: '12px 24px' }}
              onClick={async () => {
                try {
                  const { demo } = await import('../../api');
                  await demo.seed();
                  alert('Demo ma`lumotlar muvaffaqiyatli yaratildi!');
                  window.location.reload();
                } catch (e) {
                  alert('Xatolik: ' + e.message);
                }
              }}
            >
              Demo Ma'lumot Qushish
            </button>
          </div>

          <Routes>
            <Route path="/" element={
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                {statsData && (
                  <>
                    <div className="stats-grid" style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                      gap: '20px',
                      marginBottom: '32px'
                    }}>
                      {statConfigs.map((cfg) => {
                        const styles = getStatStyles(cfg.type);
                        const Icon = styles.icon;
                        return (
                          <div key={cfg.key} className="stat-card-premium" style={{ '--stat-accent': styles.accent, '--stat-bg': styles.bg }}>
                            <div className="stat-icon-wrap">
                              <Icon size={22} />
                            </div>
                            <p>{cfg.label}</p>
                            <h3>{cfg.value}{cfg.suffix && <span style={{ fontSize: '14px', fontWeight: 500, marginLeft: '4px', color: '#64748B' }}>{cfg.suffix}</span>}</h3>
                          </div>
                        );
                      })}
                    </div>

                    <div className="broadcast-section" style={{ marginBottom: '32px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                        <Bell size={22} style={{ color: '#3B82F6' }} />
                        <h3 style={{ margin: 0 }}>Xabarnoma yuborish (Broadcast)</h3>
                      </div>
                      <div className="broadcast-form-row">
                        <div className="form-group">
                          <label>Xabar matni</label>
                          <input
                            type="text"
                            value={broadcastForm.message}
                            onChange={(e) => setBroadcastForm({ ...broadcastForm, message: e.target.value })}
                            placeholder="Mijozlar uchun yangilik yoki xabar..."
                            className="form-control"
                          />
                        </div>
                        <div className="form-group">
                          <label>Turi</label>
                          <select
                            className="form-control"
                            value={broadcastForm.type}
                            onChange={(e) => setBroadcastForm({ ...broadcastForm, type: e.target.value })}
                          >
                            <option value="info">Ma'lumot</option>
                            <option value="success">Muvaffaqiyat</option>
                            <option value="warning">Ogohlantirish</option>
                            <option value="urgent">Muhim</option>
                          </select>
                        </div>
                        <button
                          className="btn btn-primary"
                          style={{ height: '48px', borderRadius: '14px' }}
                          disabled={isSending || !broadcastForm.message}
                          onClick={async () => {
                            setIsSending(true);
                            try {
                              await notifyApi.broadcast(broadcastForm);
                              alert('Xabar barcha foydalanuvchlarga yuborildi!');
                              setBroadcastForm({ message: '', type: 'info' });
                            } catch (e) {
                              alert('Xatolik: ' + e.message);
                            } finally {
                              setIsSending(false);
                            }
                          }}
                        >
                          {isSending ? 'Yuborilmoqda...' : 'Yuborish'}
                        </button>
                      </div>
                    </div>

                    <div className="dashboard-grid-2" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '32px' }}>
                      <div className="charts-area">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                          <h3 style={{ margin: 0 }}>Sotuvlar Trendi</h3>
                          <TrendingUp size={20} color="#3B82F6" />
                        </div>
                        <div style={{ height: '300px', width: '100%' }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={statsData.revenueTrend}>
                              <defs>
                                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.15}/>
                                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                              <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} dy={10} />
                              <YAxis hide />
                              <Tooltip
                                contentStyle={{
                                  background: 'rgba(255,255,255,0.95)',
                                  backdropFilter: 'blur(12px)',
                                  borderRadius: '14px',
                                  border: '1px solid #E2E8F0',
                                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                                  padding: '12px 16px'
                                }}
                                formatter={(value) => [`${value.toLocaleString()} so'm`, 'Daromad']}
                              />
                              <Area type="monotone" dataKey="val" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      <div className="status-donut">
                        <h3 style={{ margin: '0 0 20px 0' }}>Holatlar</h3>
                        <div style={{ height: '220px', width: '100%' }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={statsData.statusDistribution}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={4}
                                dataKey="count"
                                nameKey="label"
                                stroke="none"
                              >
                                {statsData.statusDistribution.map((entry, index) => (
                                  <Cell key={"cell-" + index} fill={
                                    entry.label === 'delivered' ? '#10B981' :
                                    (entry.label === 'pending' ? '#F59E0B' :
                                    (entry.label === 'cancelled' ? '#EF4444' : '#6366F1'))
                                  } />
                                ))}
                              </Pie>
                              <Tooltip />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="status-legend">
                          {statsData.statusDistribution.map((stat, i) => (
                            <div key={i} className="status-legend-item">
                              <div className="status-legend-dot" style={{
                                background: stat.label === 'delivered' ? '#10B981' :
                                  (stat.label === 'pending' ? '#F59E0B' :
                                  (stat.label === 'cancelled' ? '#EF4444' : '#6366F1'))
                              }}></div>
                              <span style={{ textTransform: 'capitalize' }}>{stat.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="charts-area" style={{ marginBottom: '32px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h3 style={{ margin: 0 }}>Eng ko'p saqlangan mahsulotlar (Wishlist)</h3>
                        <Heart size={20} color="#EF4444" />
                      </div>
                      <div style={{ height: '300px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={statsData.popularWishlist}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
                            <Tooltip
                              contentStyle={{
                                background: 'rgba(255,255,255,0.95)',
                                backdropFilter: 'blur(12px)',
                                borderRadius: '14px',
                                border: '1px solid #E2E8F0',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                                padding: '12px 16px'
                              }}
                            />
                            <Bar dataKey="wishlist_count" fill="#EC4899" radius={[10, 10, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="dashboard-grid-2" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
                      <div className="admin-table-card">
                        <div className="table-header-row">
                          <h3 style={{ margin: 0 }}>Oxirgi Buyurtmalar</h3>
                          <Link to="/admin/orders" className="view-all">Barchasini ko'rish →</Link>
                        </div>
                        <div className="table-responsive">
                          <table className="table">
                            <thead>
                              <tr>
                                <th>ID</th>
                                <th>Mijoz</th>
                                <th>Sana</th>
                                <th>Summa</th>
                                <th>Holat</th>
                              </tr>
                            </thead>
                            <tbody>
                              {statsData.recentOrders?.map(order => (
                                <tr key={order.id}>
                                  <td style={{ fontWeight: 600, color: 'var(--text-muted)' }}>#{order.id}</td>
                                  <td style={{ fontWeight: 600 }}>{order.customer_name}</td>
                                  <td style={{ color: '#64748B' }}>{new Date(order.created_at).toLocaleDateString()}</td>
                                  <td style={{ fontWeight: 700 }}>{order.total_amount?.toLocaleString()} so'm</td>
                                  <td>
                                    <span className={`status-badge ${order.status}`}>
                                      {order.status}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="low-stock-widget">
                        <h3>
                          <TrendingDown size={20} color="#EF4444" /> Kam Qolgan
                        </h3>
                        {statsData.lowStockProducts?.length > 0 ? (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {statsData.lowStockProducts.map(p => (
                              <div key={p.id} className="low-stock-item">
                                <div className="low-stock-item-info">
                                  <div className="low-stock-item-name">{p.name}</div>
                                  <div className="low-stock-item-meta">Zaxira: {p.stock_count} dona</div>
                                </div>
                                <Link to="/admin/products" style={{ color: '#DC2626' }}><AlertCircle size={18} /></Link>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="no-low-stock">
                            <CheckCircle size={32} />
                            <p>Hamma mahsulot yetarli</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            } />
            <Route path="/products" element={<AdminProducts />} />
            <Route path="/categories" element={<AdminCategories />} />
            <Route path="/orders" element={<AdminOrders />} />
            <Route path="/users" element={<AdminUsers />} />
            <Route path="/reviews" element={<AdminReviews />} />
            <Route path="/management" element={<AdminManagement />} />
            <Route path="/logs" element={<ActivityLogs />} />
            <Route path="/promo" element={<AdminPromoCodes />} />
            <Route path="/ads" element={<AdminAds />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;