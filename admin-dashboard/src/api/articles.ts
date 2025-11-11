import { apiClient } from './client';

export interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  category?: string;
  image_url?: string;
  author?: string;
  is_published: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface ArticleCreate {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  category?: string;
  image_url?: string;
  author?: string;
}

export interface ArticleUpdate {
  title?: string;
  slug?: string;
  content?: string;
  excerpt?: string;
  category?: string;
  image_url?: string;
  author?: string;
  is_published?: boolean;
}

export const articlesApi = {
  list: async (params?: {
    skip?: number;
    limit?: number;
    category?: string;
    is_published?: boolean;
  }): Promise<Article[]> => {
    const response = await apiClient.get('/api/articles/', { params });
    return response.data;
  },

  get: async (id: number): Promise<Article> => {
    const response = await apiClient.get(`/api/articles/${id}`);
    return response.data;
  },

  create: async (data: ArticleCreate): Promise<Article> => {
    const response = await apiClient.post('/api/articles/', data);
    return response.data;
  },

  update: async (id: number, data: ArticleUpdate): Promise<Article> => {
    const response = await apiClient.patch(`/api/articles/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/articles/${id}`);
  },
};
