export interface User {
  id: number;
  email: string;
  phone: string;
  full_name: string;
  city?: string;
  address?: string;
  created_at: string;
  updated_at: string;
}

export interface Advisor {
  id: number;
  name: string;
  email: string;
  phone: string;
  city?: string;
  is_active: boolean;
  total_applications: number;
  created_at: string;
  updated_at: string;
}

export type ApplicationStatus = 'pending' | 'review' | 'approved' | 'rejected' | 'disbursed';

export interface Application {
  id: number;
  user_id: number;
  advisor_id?: number;
  application_number: string;
  product_type: string;
  loan_amount: string;
  loan_purpose?: string;
  preferred_advisor?: string;
  monthly_income?: string;
  occupation?: string;
  company_name?: string;
  work_experience?: string;
  has_npwp: boolean;
  has_ktp: boolean;
  additional_notes?: string;
  status: ApplicationStatus;
  current_step: string;
  submitted_at: string;
  updated_at: string;
  user?: User;
  advisor?: Advisor;
  documents?: Document[];
  timeline?: TimelineEntry[];
}

export interface TimelineEntry {
  id: number;
  status: ApplicationStatus;
  notes?: string;
  created_by?: number;
  created_at: string;
}

export type DocumentStatus = 'pending' | 'received' | 'verified';

export interface Document {
  id: number;
  application_id: number;
  document_type: string;
  file_path: string;
  file_name: string;
  file_size: number;
  mime_type: string;
  status: DocumentStatus;
  uploaded_at: string;
  verified_at?: string;
  verified_by?: number;
}

export interface DashboardStats {
  total_applications: number;
  applications_by_status: {
    pending: number;
    review: number;
    approved: number;
    rejected: number;
    disbursed: number;
  };
  total_users: number;
  active_advisors: number;
  applications_this_month: number;
  avg_processing_time_days: number;
  recent_applications: Array<{
    id: number;
    application_number: string;
    product_type: string;
    status: ApplicationStatus;
    submitted_at: string;
  }>;
}

export interface Admin {
  id: number;
  email: string;
  full_name: string;
  role: 'admin' | 'adviser' | 'viewer';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

