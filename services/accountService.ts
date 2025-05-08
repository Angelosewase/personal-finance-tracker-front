"use client"
import { ApiResponse, PaginatedResponse } from '../types/models/base';
import { 
  Account,
  CreateAccountRequest,
  UpdateAccountRequest,
  AccountFilter,
  BalanceByAccountType
} from '../types/models/account';
import axios from 'axios';

const ACCOUNTS_URL = '/api/accounts';
const BALANCES_URL = '/api/balances';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000, 
  withCredentials:true
});
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("using token --> ", token)
    if (token && config.headers) {
      console.log("setting headers token -->", token)
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
const buildQueryString = (filters: AccountFilter = {}): string => {
  const params = new URLSearchParams();
  
  if (filters.page !== undefined) params.append('page', filters.page.toString());
  if (filters.size !== undefined) params.append('size', filters.size.toString());
  if (filters.type) params.append('type', filters.type);
  
  return params.toString();
};

const accountService = {
 
  async createAccount(accountData: CreateAccountRequest): Promise<ApiResponse> {
    try {
      const response = await apiClient.post<ApiResponse>(ACCOUNTS_URL, accountData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  
  async getAccounts(filters: AccountFilter = {}): Promise<PaginatedResponse<Account>> {
    try {
      const queryString = buildQueryString(filters);
      const response = await apiClient.get<PaginatedResponse<Account>>(
        `${ACCOUNTS_URL}?${queryString}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getAccount(accountId: number): Promise<Account> {
    try {
      const response = await apiClient.get<Account>(`${ACCOUNTS_URL}/${accountId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateAccount(accountId: number, accountData: UpdateAccountRequest): Promise<Account> {
    try {
      const response = await apiClient.put<Account>(
        `${ACCOUNTS_URL}/${accountId}`, 
        accountData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteAccount(accountId: number): Promise<ApiResponse> {
    try {
      const response = await apiClient.delete<ApiResponse>(`${ACCOUNTS_URL}/${accountId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getAccountBalance(accountId: number): Promise<number> {
    try {
      const response = await apiClient.get<number>(`${ACCOUNTS_URL}/${accountId}/balance`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getTotalBalance(): Promise<number> {
    try {
      const response = await apiClient.get<number>(`${BALANCES_URL}/summary`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getBalancesByAccountType(): Promise<BalanceByAccountType> {
    try {
      const response = await apiClient.get<BalanceByAccountType>(
        `${BALANCES_URL}/summary/by-account-type`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },


  async getBalancesByAccount(
    accountId: number, 
    page: number = 0, 
    size: number = 10
  ): Promise<PaginatedResponse<any>> {
    try {
      const response = await apiClient.get<PaginatedResponse<any>>(
        `${BALANCES_URL}/account/${accountId}?page=${page}&size=${size}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default accountService; 