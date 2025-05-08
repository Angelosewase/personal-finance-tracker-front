import { BaseFilter } from './base';

export enum AccountType {
  CHECKING = 'CHECKING',
  SAVINGS = 'SAVINGS',
  CREDIT_CARD = 'CREDIT_CARD',
  CASH = 'CASH',
  INVESTMENT = 'INVESTMENT',
  RETIREMENT = 'RETIREMENT',
  LOAN = 'LOAN',
  MORTGAGE = 'MORTGAGE'
}
export interface Account {
  id: number;
  name: string;
  type: string;
  initialBalance: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAccountRequest {
  name: string;
  type: string;
  initialBalance: number;
}

export interface UpdateAccountRequest {
  name?: string;
  type?: string;
  initialBalance?: number;
}

export interface BalanceByAccountType {
  [key: string]: number;
}

export interface AccountFilter extends BaseFilter {
  type?: string;
} 