import axios from 'axios';
import { Food, Order } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getFoods = () => api.get<Food[]>('/foods');

export const createOrder = (order: Order) => api.post('/orders', order);

export const getOrderStatus = (orderId: number) => api.get(`/orders/${orderId}`);