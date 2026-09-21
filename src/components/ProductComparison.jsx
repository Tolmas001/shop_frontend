import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight } from 'lucide-react';
import { useApp } from '../hooks/useApp';

const ProductComparison = () => {
  const { comparisonList, removeFromComparison, clearComparison, formatPrice, backendUrl } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(comparisonList.length > 0);
  }, [comparisonList]);

  if (comparisonList.length === 0) return null;

  const features = [
    { key: 'price', label: 'Narx' },
    { key: 'brand', label: 'Brand' },
    { key: 'category', label: 'Kategoriya' },
    { key: 'stock_count', label: 'Ombor' },
    { key: 'rating', label: 'Reyting' },
  ];

  return (
    <div className="comparison-container">
      <button 
        className="comparison-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{comparisonList.length} ta mahsulot solishtirilmoqda</span>
        <ArrowRight size={16} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="comparison-modal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="comparison-header">
              <h3>Mahsulotlarni solishtirish</h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={clearComparison} style={{ fontSize: '12px', padding: '8px 12px' }}>
                  Tozalash
                </button>
                <button onClick={() => setIsOpen(false)}>
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="comparison-table">
              <table>
                <thead>
                  <tr>
                    <th>Xususiyat</th>
                    {comparisonList.map(product => (
                      <th key={product.id}>
                        <div className="comparison-product">
                          <img 
                            src={product.image?.startsWith('/') ? `${backendUrl}${product.image}` : (product.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100')} 
                            alt={product.name}
                          />
                          <h4>{product.name}</h4>
                          <button onClick={() => removeFromComparison(product.id)}>
                            <X size={16} />
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {features.map(feature => (
                    <tr key={feature.key}>
                      <td>{feature.label}</td>
                      {comparisonList.map(product => (
                        <td key={product.id}>
                          {feature.key === 'price' ? formatPrice(product[feature.key]) :
                           feature.key === 'stock_count' ? (
                            product[feature.key] > 0 ? `${product[feature.key]} ta` : 'Yo\'q'
                           ) :
                           feature.key === 'rating' ? (
                            <div style={{ display: 'flex', gap: '2px' }}>
                              {[1,2,3,4,5].map(i => (
                                <span key={i} style={{ color: i <= 4 ? '#F59E0B' : '#D1D5DB' }}>★</span>
                              ))}
                            </div>
                           ) :
                           product[feature.key] || '-'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductComparison;