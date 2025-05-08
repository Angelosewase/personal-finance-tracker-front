import apiClient from './apiClient';
import { ApiResponse, PaginatedResponse } from '../types/models/base';
import { Bill } from '../types/models/bill';

const API_URL = '/bills';

/**
 * Helper function to build query string from filter parameters
 */
const buildQueryString = (filters: BillFilter = {}): string => {
  const params = new URLSearchParams();
  
  if (filters.page !== undefined) params.append('page', filters.page.toString());
  if (filters.size !== undefined) params.append('size', filters.size.toString());
  if (filters.status) params.append('status', filters.status);
  if (filters.category) params.append('category', filters.category);
  if (filters.isRecurring !== undefined) params.append('isRecurring', filters.isRecurring.toString());
  if (filters.startDate) params.append('startDate', filters.startDate);
  if (filters.endDate) params.append('endDate', filters.endDate);
  
  return params.toString();
};

// Bill filter interface
export interface BillFilter {
  page?: number;
  size?: number;
  status?: string;
  category?: string;
  isRecurring?: boolean;
  startDate?: string;
  endDate?: string;
}

// Request for creating a bill
export interface CreateBillRequest {
  name: string;
  amount: number;
  category: string;
  dueDate: string;
  isRecurring: boolean;
  recurringFrequency?: string;
  paymentMethod?: string;
  note?: string;
  status: 'paid' | 'pending' | 'overdue';
}

// Request for updating a bill
export interface UpdateBillRequest {
  name?: string;
  amount?: number;
  category?: string;
  dueDate?: string;
  isRecurring?: boolean;
  recurringFrequency?: string;
  paymentMethod?: string;
  paymentDate?: string;
  note?: string;
  status?: 'paid' | 'pending' | 'overdue';
}

const billService = {
  async createBill(billData: CreateBillRequest): Promise<Bill> {
    try {
      const response = await apiClient.post<Bill>(API_URL, billData);
      return response.data;
    } catch (error) {
      console.error('Error creating bill:', error);
      throw new Error('Failed to create bill');
    }
  },

  async getBill(billId: string): Promise<Bill> {
    try {
      const response = await apiClient.get<Bill>(`${API_URL}/${billId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching bill:', error);
      throw new Error(`Failed to fetch bill with ID ${billId}`);
    }
  },

  async getBills(filters: BillFilter = {}): Promise<PaginatedResponse<Bill>> {
    try {
      const queryString = buildQueryString(filters);
      const response = await apiClient.get<PaginatedResponse<Bill>>(
        `${API_URL}?${queryString}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching bills:', error);
      throw new Error('Failed to fetch bills');
    }
  },

  async getUpcomingBills(daysAhead: number = 30): Promise<Bill[]> {
    try {
      const response = await apiClient.get<Bill[]>(`${API_URL}/upcoming?daysAhead=${daysAhead}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getBillsByCategory(category: string): Promise<Bill[]> {
    try {
      const response = await apiClient.get<Bill[]>(`${API_URL}/category/${category}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getBillsByDateRange(startDate: string, endDate: string): Promise<Bill[]> {
    try {
      const response = await apiClient.get<Bill[]>(
        `${API_URL}/date-range?startDate=${startDate}&endDate=${endDate}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateBill(billId: string, billData: UpdateBillRequest): Promise<Bill> {
    try {
      const response = await apiClient.put<Bill>(`${API_URL}/${billId}`, billData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async markBillAsPaid(billId: string, paymentDate?: string): Promise<Bill> {
    try {
      const response = await apiClient.patch<Bill>(`${API_URL}/${billId}/pay`, {
        paymentDate: paymentDate || new Date().toISOString().split('T')[0]
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteBill(billId: string): Promise<ApiResponse> {
    try {
      const response = await apiClient.delete<ApiResponse>(`${API_URL}/${billId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default billService; 