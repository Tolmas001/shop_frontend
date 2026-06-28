import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, Download } from 'lucide-react';

const ReceiptModal = ({ imageUrl, onClose }) => {
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: 'white',
            borderRadius: '16px',
            padding: '20px',
            maxWidth: '90vw',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              width: '36px',
              height: '36px',
              background: '#f1f5f9',
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10
            }}
          >
            <X size={20} />
          </button>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', justifyContent: 'center' }}>
            <button
              onClick={handleZoomOut}
              disabled={zoom <= 0.5}
              style={{
                padding: '8px 12px',
                background: '#f1f5f9',
                borderRadius: '8px',
                border: 'none',
                cursor: zoom > 0.5 ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontWeight: 600
              }}
            >
              <ZoomOut size={16} />
            </button>
            <span style={{ display: 'flex', alignItems: 'center', fontWeight: 600, fontSize: '14px' }}>
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={zoom >= 3}
              style={{
                padding: '8px 12px',
                background: '#f1f5f9',
                borderRadius: '8px',
                border: 'none',
                cursor: zoom < 3 ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontWeight: 600
              }}
            >
              <ZoomIn size={16} />
            </button>
            <a
              href={imageUrl}
              download="receipt.png"
              style={{
                padding: '8px 12px',
                background: 'var(--primary)',
                color: 'white',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              <Download size={16} />
            </a>
          </div>

          <div style={{ overflow: 'auto', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src={imageUrl}
              alt="Receipt"
              style={{
                maxWidth: '100%',
                maxHeight: '70vh',
                transform: `scale(${zoom})`,
                transition: 'transform 0.2s ease',
                borderRadius: '8px'
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReceiptModal;
