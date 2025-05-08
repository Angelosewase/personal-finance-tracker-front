import { BaseFilter } from './base';

export enum GoalStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  ON_HOLD = 'ON_HOLD'
}

export interface Goal {
  id: number;
  userId: number;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  description: string;
  category: string;
  status: GoalStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateGoalRequest {
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  description: string;
  category: string;
  status?: GoalStatus;
}

export interface UpdateGoalRequest {
  targetAmount?: number;
  currentAmount?: number;
  deadline?: string;
  description?: string;
  category?: string;
  status?: GoalStatus;
}

/**
 * Goal filter parameters
 */
export interface GoalFilter extends BaseFilter {
  status?: GoalStatus;
  category?: string;
} 