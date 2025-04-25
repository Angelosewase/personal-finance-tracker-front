export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: User;
  token?: string;
}