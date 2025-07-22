export interface User {
  id: string;
  email: string;
  name: string;
  role: 'executive' | 'field_officer' | 'admin';
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  role: 'executive' | 'field_officer' | 'admin';
}