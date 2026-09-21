import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Heart, User, Menu } from 'lucide-react';
import { useApp } from '../hooks/useApp';

const BottomNav = () => {
  const location = useLocation();
  const { cart } = useApp();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Bosh sahifa' },
    { path: '/products', icon: ShoppingBag, label: 'Mahsulotlar' },
    { path: '/favorites', icon: Heart, label: 'Sevimlilar' },
    { path: '/profile', icon: User, label: 'Profil' },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const cartCount = item.path === '/cart' ? cart?.length : 0;
        
        return (
          <Link 
            key={item.path} 
            to={item.path} 
            className={`bottom-nav-item ${isActive ? 'active' : ''}`}
          >
            <div style={{ position: 'relative' }}>
              <item.icon size={20} />
              {cartCount > 0 && (
                <span className="bottom-nav-badge">{cartCount}</span>
              )}
            </div>
            <span>{item.label}</span>
          </Link>
        );
      })}
      <button className="bottom-nav-item" onClick={() => window.dispatchEvent(new CustomEvent('openMenu'))}>
        <Menu size={20} />
        <span>Menu</span>
      </button>
    </nav>
  );
};

export default BottomNav;