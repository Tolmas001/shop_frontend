import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import { auth } from '../services/api';

const LoginSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser, showNotification, t } = useApp();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      localStorage.setItem('token', token);
      
      // Fetch user data to update state immediately
      auth.me()
        .then(res => {
          const userData = res.data?.user || res.data;
          console.log('User data from /api/auth/me:', userData);
          
          if (userData && userData.id && userData.username) {
            // Ensure role exists, default to 'user' if missing
            if (!userData.role) {
              userData.role = 'user';
            }
            
            // Create a safe user object with all required fields
            const safeUser = {
              id: userData.id,
              username: userData.username,
              email: userData.email,
              role: userData.role || 'user',
              image: userData.image,
              full_name: userData.full_name,
              phone: userData.phone,
              points: userData.points || 0,
              notifications_enabled: userData.notifications_enabled !== false,
              privacy_private: userData.privacy_private || false,
              address_list: userData.address_list || [],
              saved_cards: userData.saved_cards || []
            };
            
            setUser(safeUser);
            showNotification(t('login_success') || 'Muvaffaqiyatli kirdingiz!');
            let redirectPath = localStorage.getItem('redirectAfterLogin') || '/';
            if (safeUser.role === 'admin' || safeUser.role === 'superadmin') {
              redirectPath = redirectPath === '/' ? '/admin' : redirectPath;
            }
            localStorage.removeItem('redirectAfterLogin');
            navigate(redirectPath);
          } else {
            console.error('Invalid user data in response:', userData);
            localStorage.removeItem('token');
            navigate('/login?error=invalid_user_data');
          }
        })
        .catch(err => {
          console.error('Error fetching user after Google login:', err);
          localStorage.removeItem('token');
          navigate('/login?error=auth_failed');
        });
    } else {
      navigate('/login');
    }
  }, [searchParams, navigate, setUser, showNotification, t]);

  return (
    <div className="container section" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <div className="loader"></div>
      <p style={{ marginLeft: '1rem' }}>Sizni tizimga kiritmoqdamiz, biroz kuting...</p>
    </div>
  );
};

export default LoginSuccess;
