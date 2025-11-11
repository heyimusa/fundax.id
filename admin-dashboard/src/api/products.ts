import { apiClient } from './client';

export interface Product {
  id: number;
  name: string;
  slug: string;
  description?: string;
  features?: string;
  requirements?: string;
  interest_rate_min?: number;
  interest_rate_max?: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductCreate {
  name: string;
  slug: string;
  description?: string;
  features?: string;
  requirements?: string;
  interest_rate_min?: number;
  interest_rate_max?: number;
}

export interface ProductUpdate {
  name?: string;
  slug?: string;
  description?: string;
  features?: string;
  requirements?: string;
  interest_rate_min?: number;
  interest_rate_max?: number;
  is_active?: boolean;
}

export const productsApi = {
  list: async (params?: {
    skip?: number;
    limit?: number;
    is_active?: boolean;
  }): Promise<Product[]> => {
    const response = await apiClient.get('/api/products/', { params });
    return response.data;
  },

  get: async (id: number): Promise<Product> => {
    const response = await apiClient.get(`/api/products/${id}`);
    return response.data;
  },

  create: async (data: ProductCreate): Promise<Product> => {
    const response = await apiClient.post('/api/products/', data);
    return response.data;
  },

  update: async (id: number, data: ProductUpdate): Promise<Product> => {
    const response = await apiClient.patch(`/api/products/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/products/${id}`);
  },
};
