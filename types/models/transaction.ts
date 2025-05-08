import { BaseFilter } from './base';

export enum TransactionType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
  TRANSFER = 'TRANSFER'
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}

export interface Transaction {
  id: number;
  userId: number;
  amount: number;
  type: TransactionType;
  description: string;
  category: string;
  date: string;
  status: TransactionStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTransactionRequest {
  amount: number;
  type: TransactionType;
  description: string;
  category: string;
  date: string;
  status?: TransactionStatus;
}

export interface UpdateTransactionRequest {
  amount?: number;
  type?: TransactionType;
  description?: string;
  category?: string;
  date?: string;
  status?: TransactionStatus;
}

export interface TransactionFilter extends BaseFilter {
  type?: TransactionType;
  category?: string;
  status?: TransactionStatus;
  startDate?: string;
  endDate?: string;
} 