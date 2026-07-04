import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';
import './NotificationToast.css';

/**
 * NotificationToast – premium styled toast notification.
 * Props:
 *   - message: string – text to display
 *   - type: 'success' | 'error' | 'warning' | 'info' – determines color & icon
 *   - duration?: number – milliseconds before auto dismiss (default 4000)
 *   - onClose?: () => void – callback when toast disappears
 */
const NotificationToast = ({ message, type = 'info', duration = 4000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => setVisible(false);

  const icons = {
    success: <CheckCircle size={20} />, 
    error: <XCircle size={20} />, 
    warning: <AlertCircle size={20} />, 
    info: <Info size={20} />, 
  };

  const colors = {
    success: { bg: '#ECFDF5', text: '#065F46', border: '#10B981' },
    error:   { bg: '#FEF2F2', text: '#991B1B', border: '#EF4444' },
    warning: { bg: '#FFFBEB', text: '#92400E', border: '#F59E0B' },
    info:    { bg: '#EFF6FF', text: '#1E40AF', border: '#3B82F6' },
  };

  const { bg, text, border } = colors[type] || colors.info;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="notification-toast"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          style={{ backgroundColor: bg, color: text, borderColor: border }}
          onAnimationComplete={() => !visible && onClose && onClose()}
        >
          <div className="toast-icon">{icons[type]}</div>
          <div className="toast-message">{message}</div>
          <button className="toast-close" onClick={handleClose} aria-label="Close">✕</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationToast;
