import { BaseFilter } from './base';

export interface Expense {
  id: number;
  userId: number;
  amount: number;
  category: string;
  description: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateExpenseRequest {
  amount: number;
  category: string;
  description: string;
  date: string;
}

export interface UpdateExpenseRequest {
  amount?: number;
  category?: string;
  description?: string;
  date?: string;
}

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC'
}

export interface ExpenseFilter extends BaseFilter {
  category?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: string;
  direction?: SortDirection;
} 