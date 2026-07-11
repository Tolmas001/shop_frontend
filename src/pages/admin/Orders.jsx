import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { orders } from '../../api';

const AdminOrders = () => {
  const [ordersList, setOrdersList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    orders.getAdmin()
      .then(res => setOrdersList(res.data))
      .catch(() => setOrdersList([]))
      .finally(() => setLoading(false));
  };

  const handleStatusChange = async (id, status) => {
    try {
      await orders.updateStatus(id, status);
      loadOrders();
    } catch (err) {
      alert('Xatolik yuz berdi');
    }
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'pending': return 'pending';
      case 'processing': return 'processing';
      case 'shipped': return 'shipped';
      case 'delivered': return 'completed';
      case 'completed': return 'completed';
      case 'cancelled': return 'cancelled';
      default: return '';
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'pending': return 'Kutilmoqda';
      case 'processing': return 'Tayyorlanmoqda';
      case 'shipped': return 'Yo\'lda';
      case 'delivered': return 'Yetkazildi';
      case 'completed': return 'Tugallangan';
      case 'cancelled': return 'Bekor qilingan';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p>Yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Buyurtmalar</h2>
      
      <motion.div 
        className="table-responsive"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <table className="table table-cards">
          <thead>
            <tr>
              <th>ID</th>
              <th>Mijoz</th>
              <th>Telefon</th>
              <th>Manzil</th>
              <th>Yetkazib berish</th>
              <th>Mahsulotlar</th>
              <th>Jami</th>
              <th>Holat</th>
              <th>Sana</th>
              <th>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {ordersList.map(order => (
              <tr key={order.id}>
                <td data-label="ID">#{order.id}</td>
                <td data-label="Mijoz">{order.customer_name}</td>
                <td data-label="Telefon">{order.customer_phone}</td>
                <td data-label="Manzil">{order.customer_address || '-'}</td>
                <td data-label="Yetkazish">
                  <div style={{ fontSize: '12px', textTransform: 'capitalize' }}>{order.delivery_method || 'standart'}</div>
                  <div style={{ fontSize: '10px', color: '#888' }}>{order.delivery_cost > 0 ? `${order.delivery_cost.toLocaleString()} so'm` : 'Bepul'}</div>
                </td>
                <td data-label="Mahsulotlar" style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {order.items || '-'}
                </td>
                <td data-label="Jami">{order.total_amount?.toLocaleString()} so'm</td>
                <td data-label="Holat">
                  <span className={`order-status ${getStatusClass(order.status)}`}>
                    {getStatusLabel(order.status)}
                  </span>
                </td>
                <td data-label="Sana">{new Date(order.created_at).toLocaleDateString('uz-UZ')}</td>
                <td data-label="Amallar">
                  <select 
                    value={order.status} 
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    style={{ 
                      padding: '8px 12px', 
                      borderRadius: '8px', 
                      border: '1px solid #d2d2d7',
                      background: 'white',
                      fontSize: '13px',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="pending">Kutilmoqda</option>
                    <option value="processing">Tayyorlanmoqda</option>
                    <option value="shipped">Yo'lda</option>
                    <option value="delivered">Yetkazildi</option>
                    <option value="cancelled">Bekor qilingan</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {ordersList.length === 0 && (
        <motion.div 
          className="empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Buyurtmalar yo'q
        </motion.div>
      )}
    </div>
  );
};

export default AdminOrders;
