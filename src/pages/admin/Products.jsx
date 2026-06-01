import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products, categories } from '../../api';
import { useApp } from '../../context/AppContext';

const AdminProducts = () => {
  const { backendUrl, handleImageError } = useApp();
  const [productsList, setProductsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ 
    name: '', 
    brand: '', 
    category: '', 
    description: '', 
    price: '', 
    image: '', 
    colors: [], 
    sizes: [], 
    stock_count: '' 
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    products.getAll().then(res => setProductsList(res.data));
    categories.getAll().then(res => setCategoriesList(res.data));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        name: form.name,
        brand: form.brand,
        category: form.category,
        description: form.description,
        price: parseFloat(form.price),
        image: form.image,
        colors: form.colors,
        sizes: form.sizes,
        stock_count: parseInt(form.stock_count) || 0
      };
      
      if (editItem) {
        await products.update(editItem.id, data);
      } else {
        await products.create(data);
      }
      
      setShowModal(false);
      setEditItem(null);
      setForm({ name: '', brand: '', category: '', description: '', price: '', image: '', colors: [], sizes: [], stock_count: '' });
      loadData();
    } catch (err) {
      alert('Xatolik yuz berdi');
    }
  };

  const handleEdit = (product) => {
    setEditItem(product);
    setForm({
      name: product.name,
      brand: product.brand,
      category: product.category,
      description: product.description || '',
      price: product.price.toString(),
      image: product.image || '',
      colors: product.colors || [],
      sizes: product.sizes || [],
      stock_count: product.stock_count?.toString() || '0'
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Haqiqatan ham o'chirmoqchimisiz?")) {
      await products.delete(id);
      loadData();
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2>Mahsulotlar</h2>
        <motion.button 
          className="btn"
          onClick={() => { 
            setShowModal(true); 
            setEditItem(null); 
            setForm({ name: '', brand: '', category: '', description: '', price: '', image: '', colors: [], sizes: [], stock_count: '' }); 
          }}
          whileTap={{ scale: 0.95 }}
        >
          + Yangi mahsulot
        </motion.button>
      </div>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Rasm</th>
              <th>Nom</th>
              <th>Brend</th>
              <th>Kategoriya</th>
              <th>Narx</th>
              <th>Ombor</th>
              <th>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {productsList.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>
                  <img 
                    src={p.image?.startsWith('/') ? `${backendUrl}${p.image}` : (p.image || 'https://via.placeholder.com/50')} 
                    alt="" 
                    style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }}
                    onError={handleImageError}
                  />
                </td>
                <td>{p.name}</td>
                <td>{p.brand}</td>
                <td>{p.category}</td>
                <td>{p.price?.toLocaleString()} so'm</td>
                <td>{p.stock_count}</td>
                <td className="table-actions">
                  <motion.button 
                    className="btn btn-secondary" 
                    onClick={() => handleEdit(p)}
                    whileTap={{ scale: 0.95 }}
                  >
                    Tahrirlash
                  </motion.button>
                  <motion.button 
                    className="btn btn-danger" 
                    onClick={() => handleDelete(p.id)}
                    whileTap={{ scale: 0.95 }}
                  >
                    O'chirish
                  </motion.button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="modal-content"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              onClick={e => e.stopPropagation()}
              style={{ maxHeight: '90vh', display: 'flex', flexDirection: 'column', width: '95%', maxWidth: '600px', borderRadius: '24px' }}
            >
              <div className="modal-header" style={{ padding: '24px 32px 16px', borderBottom: '1px solid #f1f5f9' }}>
                <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 800 }}>{editItem ? 'Mahsulotni tahrirlash' : 'Yangi mahsulot'}</h3>
                <button className="modal-close" onClick={() => setShowModal(false)} style={{ fontSize: '28px', color: '#94a3b8' }}>×</button>
              </div>
              
              <div className="modal-body" style={{ overflowY: 'auto', padding: '24px 32px 32px', flex: 1 }}>
                <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Mahsulot nomi *</label>
                  <input 
                    type="text" 
                    value={form.name} 
                    onChange={e => setForm({...form, name: e.target.value})} 
                    required 
                  />
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label>Brend *</label>
                    <input 
                      type="text" 
                      value={form.brand} 
                      onChange={e => setForm({...form, brand: e.target.value})} 
                      placeholder="Nike, Apple, Samsung..."
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Kategoriya *</label>
                    <input 
                      type="text" 
                      value={form.category} 
                      onChange={e => setForm({...form, category: e.target.value})} 
                      placeholder="Elektronika, Kiyim..."
                      required 
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Tavsif</label>
                  <input 
                    type="text" 
                    value={form.description} 
                    onChange={e => setForm({...form, description: e.target.value})} 
                  />
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label>Narx (so'm) *</label>
                    <input 
                      type="number" 
                      value={form.price} 
                      onChange={e => setForm({...form, price: e.target.value})} 
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Ombor (dona) *</label>
                    <input 
                      type="number" 
                      value={form.stock_count} 
                      onChange={e => setForm({...form, stock_count: e.target.value})} 
                      required 
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', margin: '20px 0' }}>
                  {/* Colors Management */}
                  <div className="form-group" style={{ background: '#f8fafc', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <label style={{ margin: 0, fontWeight: 700, fontSize: '14px', color: '#1e293b' }}>Ranglar</label>
                      {form.colors.length > 0 && (
                        <button type="button" onClick={() => setForm({ ...form, colors: [] })} style={{ fontSize: '11px', color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer' }}>Tozalash</button>
                      )}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px', minHeight: '32px' }}>
                      {form.colors.length === 0 && <span style={{ fontSize: '12px', color: '#94a3b8', fontStyle: 'italic' }}>Rang qo'shilmagan</span>}
                      {form.colors.map((color, idx) => (
                        <motion.span 
                          key={idx}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          style={{ 
                            background: '#3b82f6', color: 'white', padding: '5px 12px', 
                            borderRadius: '20px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px',
                            boxShadow: '0 2px 4px rgba(59, 130, 246, 0.2)'
                          }}
                        >
                          {color}
                          <button type="button" onClick={() => setForm({ ...form, colors: form.colors.filter((_, i) => i !== idx) })}
                            style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', cursor: 'pointer', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>
                            ×
                          </button>
                        </motion.span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input 
                        type="text" 
                        placeholder="Yangi rang..."
                        id="new-color-input"
                        className="tag-input-style"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            const val = e.target.value.trim();
                            if (val && !form.colors.includes(val)) {
                              setForm({ ...form, colors: [...form.colors, val] });
                              e.target.value = '';
                            }
                          }
                        }}
                        style={{ 
                          flex: 1, padding: '8px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px'
                        }}
                      />
                      <button type="button" className="btn btn-secondary" style={{ padding: '0 12px', borderRadius: '10px' }}
                        onClick={() => {
                          const input = document.getElementById('new-color-input');
                          const val = input.value.trim();
                          if (val && !form.colors.includes(val)) {
                            setForm({ ...form, colors: [...form.colors, val] });
                            input.value = '';
                          }
                        }}>
                        +
                      </button>
                    </div>
                  </div>
                  
                  {/* Sizes Management */}
                  <div className="form-group" style={{ background: '#f8fafc', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <label style={{ margin: 0, fontWeight: 700, fontSize: '14px', color: '#1e293b' }}>O'lchamlar</label>
                      {form.sizes.length > 0 && (
                        <button type="button" onClick={() => setForm({ ...form, sizes: [] })} style={{ fontSize: '11px', color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer' }}>Tozalash</button>
                      )}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px', minHeight: '32px' }}>
                      {form.sizes.length === 0 && <span style={{ fontSize: '12px', color: '#94a3b8', fontStyle: 'italic' }}>O'lcham qo'shilmagan</span>}
                      {form.sizes.map((size, idx) => (
                        <motion.span 
                          key={idx}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          style={{ 
                            background: '#475569', color: 'white', padding: '5px 12px', 
                            borderRadius: '20px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px',
                            boxShadow: '0 2px 4px rgba(71, 85, 105, 0.2)'
                          }}
                        >
                          {size}
                          <button type="button" onClick={() => setForm({ ...form, sizes: form.sizes.filter((_, i) => i !== idx) })}
                            style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', cursor: 'pointer', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>
                            ×
                          </button>
                        </motion.span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input 
                        type="text" 
                        placeholder="Yangi o'lcham..."
                        id="new-size-input"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            const val = e.target.value.trim();
                            if (val && !form.sizes.includes(val)) {
                              setForm({ ...form, sizes: [...form.sizes, val] });
                              e.target.value = '';
                            }
                          }
                        }}
                        style={{ 
                          flex: 1, padding: '8px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px'
                        }}
                      />
                      <button type="button" className="btn btn-secondary" style={{ padding: '0 12px', borderRadius: '10px' }}
                        onClick={() => {
                          const input = document.getElementById('new-size-input');
                          const val = input.value.trim();
                          if (val && !form.sizes.includes(val)) {
                            setForm({ ...form, sizes: [...form.sizes, val] });
                            input.value = '';
                          }
                        }}>
                        +
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Mahsulot rasmi</label>
                  <div className="image-upload-modern" style={{ height: '140px' }}>
                    {form.image ? (
                      <div className="image-preview">
                        <img 
                          src={form.image.startsWith('data:') ? form.image : (form.image.startsWith('/') ? `${backendUrl}${form.image}` : form.image)} 
                          alt="Preview" 
                          onError={handleImageError}
                        />
                        <button 
                          type="button" 
                          className="remove-img" 
                          onClick={() => setForm({ ...form, image: '' })}
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <label className="upload-placeholder">
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setForm({ ...form, image: reader.result });
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          hidden
                        />
                        <span style={{ fontSize: '24px', marginBottom: '8px' }}>+</span>
                        <span>Rasm yuklash</span>
                      </label>
                    )}
                  </div>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px' }}>
                    Tavsiya etiladi: 800x800px, 5MB gacha
                  </p>
                </div>
                
                
              </form>
            </div>
            
            <div className="modal-footer" style={{ padding: '16px 32px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '12px' }}>
               <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)} style={{ flex: 1, borderRadius: '12px' }}>
                 Bekor qilish
               </button>
               <button type="button" className="btn btn-primary" onClick={() => document.querySelector('form').requestSubmit()} style={{ flex: 2, borderRadius: '12px', fontWeight: 700 }}>
                 Saqlash
               </button>
            </div>
          </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminProducts;