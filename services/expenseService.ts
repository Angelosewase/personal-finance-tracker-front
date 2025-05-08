import apiClient from './apiClient';
import { ApiResponse, PaginatedResponse } from '../types/models/base';
import { 
  Expense,
  CreateExpenseRequest,
  UpdateExpenseRequest,
  ExpenseFilter,
  SortDirection
} from '../types/models/expense';

const API_URL = '/expenses';


const buildQueryString = (filters: ExpenseFilter = {}): string => {
  const params = new URLSearchParams();
  
  if (filters.page !== undefined) params.append('page', filters.page.toString());
  if (filters.size !== undefined) params.append('size', filters.size.toString());
  if (filters.sortBy) params.append('sortBy', filters.sortBy);
  if (filters.direction) params.append('direction', filters.direction);
  if (filters.startDate) params.append('startDate', filters.startDate);
  if (filters.endDate) params.append('endDate', filters.endDate);
  
  return params.toString();
};

const expenseService = {

  async createExpense(expenseData: CreateExpenseRequest): Promise<Expense> {
    try {
      const response = await apiClient.post<Expense>(API_URL, expenseData);
      return response.data;
    } catch (error) {
      console.error('Error creating expense:', error);
      throw new Error('Failed to create expense');
    }
  },

  async getExpense(expenseId: number): Promise<Expense> {
    try {
      const response = await apiClient.get<Expense>(`${API_URL}/${expenseId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching expense:', error);
      throw new Error(`Failed to fetch expense with ID ${expenseId}`);
    }
  },

  async getExpenses(filters: ExpenseFilter = {}): Promise<PaginatedResponse<Expense>> {
    try {
      const queryString = buildQueryString(filters);
      const response = await apiClient.get<PaginatedResponse<Expense>>(
        `${API_URL}?${queryString}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching expenses:', error);
      throw new Error('Failed to fetch expenses');
    }
  },

  async getExpensesByCategory(
    category: string, 
    filters: Omit<ExpenseFilter, 'category'> = {}
  ): Promise<PaginatedResponse<Expense>> {
    try {
      const queryString = buildQueryString(filters);
      const response = await apiClient.get<PaginatedResponse<Expense>>(
        `${API_URL}/category/${category}?${queryString}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getExpensesByDateRange(
    startDate: string, 
    endDate: string, 
    filters: Omit<ExpenseFilter, 'startDate' | 'endDate'> = {}
  ): Promise<PaginatedResponse<Expense>> {
    try {
      const queryParams = new URLSearchParams(buildQueryString(filters));
      queryParams.append('startDate', startDate);
      queryParams.append('endDate', endDate);
      
      const response = await apiClient.get<PaginatedResponse<Expense>>(
        `${API_URL}/date-range?${queryParams.toString()}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getUserCategories(): Promise<string[]> {
    try {
      const response = await apiClient.get<string[]>(`${API_URL}/categories`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateExpense(expenseId: number, expenseData: UpdateExpenseRequest): Promise<Expense> {
    try {
      const response = await apiClient.put<Expense>(
        `${API_URL}/${expenseId}`, 
        expenseData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteExpense(expenseId: number): Promise<ApiResponse> {
    try {
      const response = await apiClient.delete<ApiResponse>(`${API_URL}/${expenseId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default expenseService; 