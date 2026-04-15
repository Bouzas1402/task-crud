import axios from 'axios';
import { toast } from 'sonner';

export const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.response.use(
  response => response.data,
  error => {
    let message = 'Error inesperado';

    if (error.response?.data?.message) {
      message = error.response.data.message;
    }
    toast.error(message);

    return Promise.reject(new Error(message));
  }
);
