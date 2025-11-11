import { apiClient } from './client';
import { User } from '../types';

export interface UserUpdate {
  full_name?: string;
  email?: string;
  phone?: string;
  city?: string;
  address?: string;
}

export const usersApi = {
  list: async (params?: {
    skip?: number;
    limit?: number;
    search?: string;
  }): Promise<User[]> => {
    const response = await apiClient.get('/api/users/', { params });
    return response.data;
  },

  get: async (id: number): Promise<User> => {
    const response = await apiClient.get(`/api/users/${id}`);
    return response.data;
  },

  update: async (id: number, data: UserUpdate): Promise<User> => {
    const response = await apiClient.patch(`/api/users/${id}`, data);
    return response.data;
  },
};
