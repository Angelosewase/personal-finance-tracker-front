"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import accountService from "@/services/accountService";
import { Account, CreateAccountRequest, UpdateAccountRequest } from "@/types/models/account";

export function useAccountsData() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Load accounts from API
  useEffect(() => {
    fetchAccounts();
  }, []);
  
  const fetchAccounts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await accountService.getAccounts();
      setAccounts(response.content);
    } catch (err) {
      console.error("Failed to fetch accounts:", err);
      setError("Failed to load accounts");
      toast.error("Failed to load accounts");
      
      // Fallback to empty array
      setAccounts([]);
    } finally {
      setLoading(false);
    }
  };
  
  // Add a new account
  const addAccount = async (accountData: CreateAccountRequest) => {
    try {
      setLoading(true);
      await accountService.createAccount(accountData);
      
      // Refresh accounts after adding
      await fetchAccounts();
      toast.success("Account added successfully");
    } catch (err) {
      console.error("Failed to add account:", err);
      toast.error("Failed to add account");
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // Update an account
  const updateAccount = async (accountId: number, updatedFields: Partial<Account>) => {
    try {
      setLoading(true);
      await accountService.updateAccount(accountId, updatedFields as UpdateAccountRequest);
      
      // Refresh accounts after updating
      await fetchAccounts();
      toast.success("Account updated successfully");
    } catch (err) {
      console.error("Failed to update account:", err);
      toast.error("Failed to update account");
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // Delete an account
  const deleteAccount = async (accountId: number) => {
    try {
      setLoading(true);
      await accountService.deleteAccount(accountId);
      
      // Update local state
      setAccounts(prev => prev.filter(account => account.id !== accountId));
      toast.success("Account deleted successfully");
    } catch (err) {
      console.error("Failed to delete account:", err);
      toast.error("Failed to delete account");
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  return {
    accounts,
    loading,
    error,
    fetchAccounts,
    addAccount,
    updateAccount,
    deleteAccount
  };
} 