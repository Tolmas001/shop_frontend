import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useNotifications } from '../context/NotificationContext';
import { config } from '../config';

export const useApp = () => {
  const auth = useAuth();
  const cart = useCart();
  const theme = useTheme();
  const notify = useNotifications();

  return {
    ...auth,
    ...cart,
    ...theme,
    ...notify,
    backendUrl: config.backendUrl,
  };
};
