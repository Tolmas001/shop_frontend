import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { promo } from '../services/api';
import { useNotifications } from './NotificationContext';
import { useTranslation } from 'react-i18next';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { showNotification } = useNotifications();
  const { t } = useTranslation();

  const [cart, setCart] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [usePoints, setUsePoints] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('favorites');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToCart = (product, selectedColor, selectedSize, quantity = 1) => {
    const variant = `${selectedColor}-${selectedSize}`;
    setCart(prev => {
      const existIndex = prev.findIndex(item => item.id === product.id && item.selectedColor === selectedColor && item.selectedSize === selectedSize);
      if (existIndex > -1) {
        return prev.map((item, index) => index === existIndex ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, selectedColor, selectedSize, variant, quantity }];
    });
    showNotification(t('success_cart'));
  };

  const toggleFavorite = (product) => {
    setFavorites(prev => {
      const isExist = prev.find(item => item.id === product.id);
      if (isExist) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const removeFromCart = (id, variant) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.variant === variant)));
  };

  const updateQuantity = (id, variant, quantity) => {
    if (quantity < 1) return;
    setCart(prev => prev.map(item => item.id === id && item.variant === variant ? { ...item, quantity } : item));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
    setUsePoints(false);
  };

  const applyPromoCode = async (code) => {
    try {
      const res = await promo.validate(code);
      setAppliedPromo(res.data);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || 'Xatolik yuz berdi' };
    }
  };

  const cartCount = useMemo(() => cart.reduce((total, item) => total + item.quantity, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.price * item.quantity), 0), [cart]);

  const clearFavorites = () => {
    setFavorites([]);
  };

  const handleImageError = (e) => {
    if (e.target.dataset.errorTried) return;
    e.target.dataset.errorTried = "true";
    e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800';
  };

  return (
    <CartContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount,
      favorites, toggleFavorite, clearFavorites,
      quickViewProduct, setQuickViewProduct,
      appliedPromo, applyPromoCode, usePoints, setUsePoints,
      handleImageError
    }}>
      {children}
    </CartContext.Provider>
  );
};
