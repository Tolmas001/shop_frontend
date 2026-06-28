import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, X, Check, AlertCircle } from 'lucide-react';
import { orders } from '../api';

const PaymentUpload = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('Fayl hajmi 5MB dan oshmasligi kerak');
        return;
      }
      if (!selectedFile.type.startsWith('image/')) {
        setError('Faqat rasm fayllarini yuklash mumkin');
        return;
      }
      setFile(selectedFile);
      setError('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreview(null);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Iltimos, chek rasmini yuklang');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await orders.uploadReceipt(orderId, file);
      navigate(`/payment-status/${orderId}`);
    } catch (err) {
      setError('Yuklashda xatolik yuz berdi. Qaytadan urinib ko\'ring.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ background: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #f1f1f1' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px' }}>Chek rasmini yuklang</h1>
          <p style={{ color: 'var(--text-muted)' }}>To'lov chekining screenshotini yuklang</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ background: '#fef2f2', padding: '16px', borderRadius: '12px', marginBottom: '24px', border: '1px solid #fecaca', display: 'flex', alignItems: 'center', gap: '12px', color: '#dc2626' }}
          >
            <AlertCircle size={20} />
            <span style={{ fontSize: '14px' }}>{error}</span>
          </motion.div>
        )}

        {!preview ? (
          <div
            style={{
              border: '2px dashed #cbd5e1',
              borderRadius: '16px',
              padding: '60px 20px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: '0.3s',
              background: '#f8fafc'
            }}
            onClick={() => document.getElementById('file-input').click()}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = '#cbd5e1'}
          >
            <Upload size={48} color="#94a3b8" style={{ marginBottom: '16px' }} />
            <p style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>
              Rasmni yuklash uchun bosing
            </p>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
              PNG, JPG yoki JPEG (maks. 5MB)
            </p>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>
        ) : (
          <div style={{ position: 'relative', marginBottom: '24px' }}>
            <img
              src={preview}
              alt="Receipt preview"
              style={{ width: '100%', borderRadius: '16px', border: '2px solid #e2e8f0' }}
            />
            <button
              onClick={handleRemoveFile}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                width: '36px',
                height: '36px',
                background: 'white',
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <X size={20} color="#dc2626" />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px', color: '#059669' }}>
              <Check size={16} />
              <span style={{ fontSize: '14px', fontWeight: 600 }}>{file.name}</span>
            </div>
          </div>
        )}

        <motion.button
          onClick={handleSubmit}
          className="btn"
          disabled={loading || !file}
          whileTap={{ scale: 0.98 }}
          style={{ width: '100%', padding: '18px', fontSize: '18px' }}
        >
          {loading ? 'Yuborilmoqda...' : 'Yuborish'}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default PaymentUpload;
