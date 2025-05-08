import apiClient from './apiClient';
import { ApiResponse, PaginatedResponse } from '../types/models/base';
import { 
  Goal,
  CreateGoalRequest,
  UpdateGoalRequest,
  GoalFilter
} from '../types/models/goal';

const API_URL = '/goals';
const BALANCES_URL = '/balances';


const buildQueryString = (filters: GoalFilter = {}): string => {
  const params = new URLSearchParams();
  
  if (filters.page !== undefined) params.append('page', filters.page.toString());
  if (filters.size !== undefined) params.append('size', filters.size.toString());
  if (filters.status) params.append('status', filters.status);
  if (filters.category) params.append('category', filters.category);
  
  return params.toString();
};


const goalService = {

  async createGoal(goalData: CreateGoalRequest): Promise<ApiResponse> {
    try {
      const response = await apiClient.post<ApiResponse>(API_URL, goalData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },


  async getGoals(filters: GoalFilter = {}): Promise<PaginatedResponse<Goal>> {
    try {
      const queryString = buildQueryString(filters);
      const response = await apiClient.get<PaginatedResponse<Goal>>(
        `${API_URL}?${queryString}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getGoal(goalId: number): Promise<Goal> {
    try {
      const response = await apiClient.get<Goal>(`${API_URL}/${goalId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateGoal(goalId: number, goalData: UpdateGoalRequest): Promise<Goal> {
    try {
      const response = await apiClient.put<Goal>(
        `${API_URL}/${goalId}`, 
        goalData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteGoal(goalId: number): Promise<ApiResponse> {
    try {
      const response = await apiClient.delete<ApiResponse>(`${API_URL}/${goalId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getGoalBalance(goalId: number): Promise<any> {
    try {
      const response = await apiClient.get<any>(`${BALANCES_URL}/goal/${goalId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default goalService; 