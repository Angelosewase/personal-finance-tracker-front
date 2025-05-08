"use client"

import apiClient from './apiClient';
import { 
  SigninRequest, 
  SignupRequest, 
  AuthToken, 
  UsernameAvailabilityResponse, 
  EmailAvailabilityResponse 
} from '../types/models/auth';

const API_URL = '/api/auth';
const USER_URL = '/api/users';

const authService = {
  async login(credentials: SigninRequest): Promise<AuthToken> {
    try {
      const response = await apiClient.post<AuthToken>(`${API_URL}/signin`, credentials);
      if (response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async register(userData: SignupRequest) {
    try {
      const response = await apiClient.post(`${API_URL}/signup`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async checkUsernameAvailability(username: string): Promise<UsernameAvailabilityResponse> {
    try {
      const response = await apiClient.get<UsernameAvailabilityResponse>(
        `${USER_URL}/checkUsernameAvailability?username=${username}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async checkEmailAvailability(email: string): Promise<EmailAvailabilityResponse> {
    try {
      const response = await apiClient.get<EmailAvailabilityResponse>(
        `${USER_URL}/checkEmailAvailability?email=${email}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout(): void {
    localStorage.removeItem('token');
  },

  getCurrentToken(): string | null {
    return localStorage.getItem('token');
  },

  isAuthenticated(): boolean {
    return !!this.getCurrentToken();
  }
};

export default authService; 