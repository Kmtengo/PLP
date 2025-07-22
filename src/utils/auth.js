// Default credentials for demo purposes
export const DEFAULT_CREDENTIALS = {
  email: 'executive@ksb.go.ke',
  password: 'KSB2024exec!'
};

// Mock authentication function
export const authenticate = (email, password) => {
  return email === DEFAULT_CREDENTIALS.email && password === DEFAULT_CREDENTIALS.password;
};

// User data
export const getUserData = () => {
  return {
    id: 1,
    name: 'John Mwangi',
    email: DEFAULT_CREDENTIALS.email,
    role: 'Executive Director',
    department: 'Executive Management',
    avatar: null,
    permissions: ['view_all', 'edit_all', 'delete_all']
  };
};