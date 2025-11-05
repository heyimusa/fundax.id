import { apiClient } from './client';
import { DashboardStats } from '../types';

export const analyticsApi = {
  getDashboardStats: async (): Promise<DashboardStats> => {
    const response = await apiClient.get('/api/analytics/dashboard');
    return response.data;
  },

  getApplicationStats: async (startDate?: string, endDate?: string) => {
    const response = await apiClient.get('/api/analytics/applications/stats', {
      params: { start_date: startDate, end_date: endDate },
    });
    return response.data;
  },

  getAdvisorsPerformance: async () => {
    const response = await apiClient.get('/api/analytics/advisors/performance');
    return response.data;
  },
};

