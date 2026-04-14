import axios from 'axios';
import { toast } from 'sonner';

export const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.response.use(
  response => response,
  error => {
    let message = 'Error inesperado';

    if (error.response?.data?.error) {
      message = error.response.data.error;
    }
    toast.error(message);

    return Promise.reject(new Error(message));
  }
);
