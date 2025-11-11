import { apiClient } from './client';
import { Application, TimelineEntry } from '../types';

export const applicationsApi = {
  list: async (params?: {
    skip?: number;
    limit?: number;
    status?: string;
    advisor_id?: number;
    product_type?: string;
    search?: string;
  }): Promise<Application[]> => {
    const response = await apiClient.get('/api/applications/', { params });
    return response.data;
  },

  get: async (id: number): Promise<Application> => {
    const response = await apiClient.get(`/api/applications/${id}`);
    return response.data;
  },

  updateStatus: async (id: number, data: {
    status: string;
    current_step: string;
    notes?: string;
  }): Promise<Application> => {
    const response = await apiClient.patch(`/api/applications/${id}/status`, data);
    return response.data;
  },

  assign: async (id: number, advisor_id: number): Promise<Application> => {
    const response = await apiClient.patch(`/api/applications/${id}/assign`, { advisor_id });
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/applications/${id}`);
  },

  addTimelineEntry: async (id: number, data: {
    status: string;
    current_step: string;
    notes?: string;
  }): Promise<TimelineEntry> => {
    const response = await apiClient.post(`/api/applications/${id}/timeline`, data);
    return response.data;
  },
};

