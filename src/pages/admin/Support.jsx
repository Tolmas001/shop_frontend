import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, Clock, CheckCircle, AlertCircle, Search, Filter, User, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Support = () => {
  const { backendUrl } = useApp();
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [filter, setFilter] = useState('all'); // all, open, in_progress, resolved, closed
  const [search, setSearch] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [reply, setReply] = useState('');

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        // Mock data - would come from API
        const mockTickets = [
          { id: 1, user: 'Ali Karimov', email: 'ali@example.com', subject: 'Buyurtma kelmadi', message: 'Order #12345 hali kelmadi, 3 kun bo\'ldi', status: 'open', priority: 'high', created_at: '2024-01-15', replies: [] },
          { id: 2, user: 'Nigora Rahimova', email: 'nigora@example.com', subject: 'To\'lov muammosi', message: 'Kartadan pul olib tashlandi lekin buyurtma tasdiqlanmadi', status: 'in_progress', priority: 'high', created_at: '2024-01-14', replies: [{ message: 'Tekshirib chiqamiz', admin: true, time: '2024-01-14' }] },
          { id: 3, user: 'Jamshid Toshmatov', email: 'jamshid@example.com', subject: 'Mahsulot buzilgan', message: 'iPhone 14 Pro qutisi ochiq kelgan, ekranda iz bor', status: 'open', priority: 'medium', created_at: '2024-01-13', replies: [] },
          { id: 4, user: 'Zarina Nazarova', email: 'zarina@example.com', subject: 'Noto\'g\'ri mahsulot', message: 'AirPods Pro o\'rniga oddiy AirPods kelgan', status: 'resolved', priority: 'medium', created_at: '2024-01-12', replies: [{ message: 'Almashtirib yuboramiz', admin: true, time: '2024-01-12' }] },
          { id: 5, user: 'Sobir Qodirov', email: 'sobir@example.com', subject: 'Yetkazib berish kechikmoqda', message: 'Buyurtma 5 kun oldin berildi lekin hali yo\'lda', status: 'closed', priority: 'low', created_at: '2024-01-10', replies: [] }
        ];
        setTickets(mockTickets);
      } catch (err) {
        console.error('Failed to fetch tickets:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter(t => {
    const matchesSearch = t.subject?.toLowerCase().includes(search.toLowerCase()) || 
                         t.user?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || t.status === filter;
    return matchesSearch && matchesFilter;
  });

  const updateTicketStatus = (ticketId, newStatus) => {
    setTickets(tickets.map(t => t.id === ticketId ? { ...t, status: newStatus } : t));
  };

  const sendReply = () => {
    if (!reply.trim() || !selectedTicket) return;
    
    const newReply = {
      message: reply,
      admin: true,
      time: new Date().toISOString()
    };
    
    setTickets(tickets.map(t => 
      t.id === selectedTicket.id 
        ? { ...t, replies: [...t.replies, newReply], status: 'in_progress' } 
        : t
    ));
    setReply('');
  };

  const getStatusColor = (status) => {
    const colors = {
      open: '#F59E0B',
      in_progress: '#3B82F6',
      resolved: '#10B981',
      closed: '#64748B'
    };
    return colors[status] || '#94A3B8';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: '#EF4444',
      medium: '#F59E0B',
      low: '#10B981'
    };
    return colors[priority] || '#94A3B8';
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
        <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px' }}>Mijoz yordami</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Support ticketlarni boshqarish</p>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #f1f1f1', textAlign: 'center' }}>
            <h3 style={{ fontSize: '28px', fontWeight: 800, margin: 0 }}>{tickets.length}</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>Jami</p>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #f1f1f1', textAlign: 'center' }}>
            <h3 style={{ fontSize: '28px', fontWeight: 800, margin: 0, color: '#F59E0B' }}>{tickets.filter(t => t.status === 'open').length}</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>Ochiq</p>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #f1f1f1', textAlign: 'center' }}>
            <h3 style={{ fontSize: '28px', fontWeight: 800, margin: 0, color: '#3B82F6' }}>{tickets.filter(t => t.status === 'in_progress').length}</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>Jarayonda</p>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #f1f1f1', textAlign: 'center' }}>
            <h3 style={{ fontSize: '28px', fontWeight: 800, margin: 0, color: '#10B981' }}>{tickets.filter(t => t.status === 'resolved').length}</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>Hal qilindi</p>
          </div>
        </div>

        {/* Filters */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '16px', border: '1px solid #f1f1f1', marginBottom: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            <input
              type="text"
              placeholder="Ticket qidirish..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['all', 'open', 'in_progress', 'resolved', 'closed'].map((f) => (
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
                {f === 'all' ? 'Barchasi' : f === 'open' ? 'Ochiq' : f === 'in_progress' ? 'Jarayonda' : f === 'resolved' ? 'Hal qilindi' : 'Yopiq'}
              </button>
            ))}
          </div>
        </div>

        {/* Tickets List */}
        <div style={{ display: 'grid', gap: '16px' }}>
          {filteredTickets.map((ticket) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '20px', marginBottom: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{ width: '48px', height: '48px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <MessageSquare size={24} color="#3B82F6" />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>#{ticket.id} - {ticket.subject}</h3>
                      <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>{ticket.user}</p>
                    </div>
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--text-main)', marginBottom: '12px' }}>{ticket.message}</p>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={14} />
                      {new Date(ticket.created_at).toLocaleDateString('uz-UZ')}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <User size={14} />
                      {ticket.email}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                  <div style={{ padding: '6px 12px', borderRadius: '20px', background: `${getPriorityColor(ticket.priority)}20`, color: getPriorityColor(ticket.priority), fontSize: '12px', fontWeight: 700 }}>
                    {ticket.priority === 'high' ? 'Yuqori' : ticket.priority === 'medium' ? 'O\'rtacha' : 'Past'}
                  </div>
                  <div style={{ padding: '6px 12px', borderRadius: '20px', background: `${getStatusColor(ticket.status)}20`, color: getStatusColor(ticket.status), fontSize: '12px', fontWeight: 700 }}>
                    {ticket.status === 'open' ? 'Ochiq' : ticket.status === 'in_progress' ? 'Jarayonda' : ticket.status === 'resolved' ? 'Hal qilindi' : 'Yopiq'}
                  </div>
                </div>
              </div>

              {/* Replies */}
              {ticket.replies.length > 0 && (
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', marginBottom: '16px' }}>
                  {ticket.replies.map((r, i) => (
                    <div key={i} style={{ marginBottom: i < ticket.replies.length - 1 ? '12px' : 0', paddingBottom: i < ticket.replies.length - 1 ? '12px' : 0', borderBottom: i < ticket.replies.length - 1 ? '1px solid #e2e8f0' : 'none' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontWeight: 700, fontSize: '12px', color: r.admin ? 'var(--primary)' : 'var(--text-main)' }}>
                          {r.admin ? 'Admin' : ticket.user}
                        </span>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{new Date(r.time).toLocaleString('uz-UZ')}</span>
                      </div>
                      <p style={{ fontSize: '14px', margin: 0 }}>{r.message}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {selectedTicket?.id === ticket.id ? (
                  <div style={{ flex: 1, display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      placeholder="Javob yozing..."
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      style={{ flex: 1, padding: '10px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none' }}
                    />
                    <button
                      onClick={sendReply}
                      style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: 'var(--primary)', color: 'white', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                      <Send size={18} />
                      Yuborish
                    </button>
                    <button
                      onClick={() => setSelectedTicket(null)}
                      style={{ padding: '10px 16px', borderRadius: '10px', border: 'none', background: '#f1f5f9', color: 'var(--text-main)', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Bekor qilish
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => setSelectedTicket(ticket)}
                      style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: '#3B82F6', color: 'white', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                      <MessageSquare size={18} />
                      Javob berish
                    </button>
                    {ticket.status === 'open' && (
                      <button
                        onClick={() => updateTicketStatus(ticket.id, 'in_progress')}
                        style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: '#F59E0B', color: 'white', fontWeight: 600, cursor: 'pointer' }}
                      >
                        Jarayonga olish
                      </button>
                    )}
                    {ticket.status === 'in_progress' && (
                      <button
                        onClick={() => updateTicketStatus(ticket.id, 'resolved')}
                        style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: '#10B981', color: 'white', fontWeight: 600, cursor: 'pointer' }}
                      >
                        Hal qilish
                      </button>
                    )}
                    {ticket.status !== 'closed' && (
                      <button
                        onClick={() => updateTicketStatus(ticket.id, 'closed')}
                        style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: '#64748B', color: 'white', fontWeight: 600, cursor: 'pointer' }}
                      >
                        Yopish
                      </button>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Support;
