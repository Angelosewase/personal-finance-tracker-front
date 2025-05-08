import apiClient from './apiClient';
import { ApiResponse, PaginatedResponse } from '../types/models/base';
import { 
  Transaction,
  CreateTransactionRequest,
  UpdateTransactionRequest,
  TransactionFilter
} from '../types/models/transaction';

const API_URL = '/transactions';

/**
 * Helper function to build query string from filter parameters
 */
const buildQueryString = (filters: TransactionFilter = {}): string => {
  const params = new URLSearchParams();
  
  if (filters.page !== undefined) params.append('page', filters.page.toString());
  if (filters.size !== undefined) params.append('size', filters.size.toString());
  if (filters.type) params.append('type', filters.type);
  if (filters.category) params.append('category', filters.category);
  if (filters.status) params.append('status', filters.status);
  if (filters.startDate) params.append('startDate', filters.startDate);
  if (filters.endDate) params.append('endDate', filters.endDate);
  
  return params.toString();
};

const transactionService = {

  async createTransaction(transactionData: CreateTransactionRequest): Promise<ApiResponse> {
    try {
      const response = await apiClient.post<ApiResponse>(API_URL, transactionData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getTransaction(transactionId: number): Promise<Transaction> {
    try {
      const response = await apiClient.get<Transaction>(`${API_URL}/${transactionId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getTransactions(filters: TransactionFilter = {}): Promise<PaginatedResponse<Transaction>> {
    try {
      const queryString = buildQueryString(filters);
      const response = await apiClient.get<PaginatedResponse<Transaction>>(
        `${API_URL}?${queryString}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateTransaction(
    transactionId: number, 
    transactionData: UpdateTransactionRequest
  ): Promise<Transaction> {
    try {
      const response = await apiClient.put<Transaction>(
        `${API_URL}/${transactionId}`, 
        transactionData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteTransaction(transactionId: number): Promise<ApiResponse> {
    try {
      const response = await apiClient.delete<ApiResponse>(`${API_URL}/${transactionId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default transactionService; 