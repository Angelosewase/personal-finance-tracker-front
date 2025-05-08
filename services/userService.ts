import apiClient from './apiClient';
import { ApiResponse } from '../types/models/base';
import { 
  UserBasic,
  UserProfile,
  UpdateUserProfileRequest,
  UpdateUserInfoRequest
} from '../types/models/user';

const API_URL = '/users';

const userService = {

  async getCurrentUser(): Promise<UserBasic> {
    try {
      const response = await apiClient.get<UserBasic>(`${API_URL}/me`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getUserProfile(username: string): Promise<UserProfile> {
    try {
      const response = await apiClient.get<UserProfile>(`${API_URL}/${username}/profile`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateUserProfile(username: string, profileData: UpdateUserProfileRequest): Promise<UserProfile> {
    try {
      const response = await apiClient.put<UserProfile>(`${API_URL}/${username}`, profileData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async setOrUpdateUserInfo(infoData: UpdateUserInfoRequest): Promise<ApiResponse> {
    try {
      const response = await apiClient.put<ApiResponse>(`${API_URL}/setOrUpdateInfo`, infoData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteUser(username: string): Promise<ApiResponse> {
    try {
      const response = await apiClient.delete<ApiResponse>(`${API_URL}/${username}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async giveAdminRights(username: string): Promise<ApiResponse> {
    try {
      const response = await apiClient.put<ApiResponse>(`${API_URL}/${username}/giveAdmin`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async removeAdminRights(username: string): Promise<ApiResponse> {
    try {
      const response = await apiClient.put<ApiResponse>(`${API_URL}/${username}/takeAdmin`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default userService; 