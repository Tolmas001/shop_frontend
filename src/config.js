const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';

export const config = {
  apiUrl: API_BASE_URL.endsWith('/') ? API_BASE_URL : `${API_BASE_URL}/`,
  backendUrl: BACKEND_URL.replace(/\/$/, ''),
};

export default config;
