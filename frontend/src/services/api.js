import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

export const initializeDatabase = () => api.get('/initialize');
export const getTransactions = (params) => api.get('/transactions', { params });
export const getStatistics = (params) => api.get('/statistics', { params });
export const getBarChartData = (params) => api.get('/bar-chart-data', { params });
export const getPieChartData = (params) => api.get('/pie-chart-data', { params });
export const getCombinedData = (params) => api.get('/combined-data', { params });

export default api;
