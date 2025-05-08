"use client";

import { useState, useEffect } from "react";
import { Goal, CreateGoalRequest, UpdateGoalRequest, GoalStatus } from "@/types/models/goal";
import { toast } from "sonner";
import goalService from "@/services/goalService";

export function useGoalsData() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Load goals from API
  useEffect(() => {
    fetchGoals();
  }, []);
  
  const fetchGoals = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await goalService.getGoals();
      setGoals(response.content);
    } catch (err) {
      console.error("Failed to fetch goals:", err);
      setError("Failed to load goals");
      toast.error("Failed to load goals");
      
      // Fallback to empty array
      setGoals([]);
    } finally {
      setLoading(false);
    }
  };
  
  // Add a new goal
  const addGoal = async (goalData: CreateGoalRequest) => {
    try {
      setLoading(true);
      await goalService.createGoal(goalData);
      
      // Refresh goals after adding
      await fetchGoals();
      toast.success("Goal added successfully");
    } catch (err) {
      console.error("Failed to add goal:", err);
      toast.error("Failed to add goal");
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // Update a goal
  const updateGoal = async (goalId: number, updatedFields: Partial<Goal>) => {
    try {
      setLoading(true);
      await goalService.updateGoal(goalId, updatedFields as UpdateGoalRequest);
      
      // Refresh goals after updating
      await fetchGoals();
      toast.success("Goal updated successfully");
    } catch (err) {
      console.error("Failed to update goal:", err);
      toast.error("Failed to update goal");
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // Delete a goal
  const deleteGoal = async (goalId: number) => {
    try {
      setLoading(true);
      await goalService.deleteGoal(goalId);
      
      // Update local state
      setGoals(prev => prev.filter(goal => goal.id !== goalId));
      toast.success("Goal deleted successfully");
    } catch (err) {
      console.error("Failed to delete goal:", err);
      toast.error("Failed to delete goal");
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // Complete a goal
  const completeGoal = async (goalId: number) => {
    try {
      setLoading(true);
      await goalService.updateGoal(goalId, { status: GoalStatus.COMPLETED });
      
      // Refresh goals after updating
      await fetchGoals();
      toast.success("Goal marked as completed");
    } catch (err) {
      console.error("Failed to complete goal:", err);
      toast.error("Failed to complete goal");
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  return {
    goals,
    loading,
    error,
    fetchGoals,
    addGoal,
    updateGoal,
    deleteGoal,
    completeGoal
  };
} 