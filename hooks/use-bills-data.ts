"use client";

import { useState, useEffect } from "react";
import { Bill } from "@/types/bill";

// Sample data for demonstration
const initialBills: Bill[] = [
  {
    id: "bill-1",
    name: "Rent",
    amount: 1500,
    category: "Housing",
    dueDate: new Date(new Date().getFullYear(), new Date().getMonth(), 5).toISOString(),
    isRecurring: true,
    recurringFrequency: "Monthly",
    paymentMethod: "Bank Transfer",
    status: "paid",
    createdAt: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1).toISOString(),
  },
  {
    id: "bill-2",
    name: "Electricity",
    amount: 125.50,
    category: "Utilities",
    dueDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 10).toISOString(),
    isRecurring: true,
    recurringFrequency: "Monthly",
    status: "pending",
    createdAt: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 5).toISOString(),
  },
  {
    id: "bill-3",
    name: "Internet",
    amount: 89.99,
    category: "Utilities",
    dueDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 5).toISOString(),
    isRecurring: true,
    recurringFrequency: "Monthly",
    paymentMethod: "Credit Card",
    status: "pending",
    createdAt: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 10).toISOString(),
  },
  {
    id: "bill-4",
    name: "Car Insurance",
    amount: 95.75,
    category: "Insurance",
    dueDate: new Date(new Date().getFullYear(), new Date().getMonth(), 15).toISOString(),
    isRecurring: true,
    recurringFrequency: "Monthly",
    paymentMethod: "Automatic Payment",
    status: "pending",
    createdAt: new Date(new Date().getFullYear(), new Date().getMonth() - 2, 15).toISOString(),
  },
  {
    id: "bill-5",
    name: "Phone Bill",
    amount: 75.00,
    category: "Utilities",
    dueDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 5).toISOString(),
    isRecurring: true,
    recurringFrequency: "Monthly",
    status: "overdue",
    createdAt: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 20).toISOString(),
  },
  {
    id: "bill-6",
    name: "Netflix",
    amount: 19.99,
    category: "Subscriptions",
    dueDate: new Date(new Date().getFullYear(), new Date().getMonth(), 22).toISOString(),
    isRecurring: true,
    recurringFrequency: "Monthly",
    paymentMethod: "Credit Card",
    status: "pending",
    createdAt: new Date(new Date().getFullYear(), new Date().getMonth() - 3, 22).toISOString(),
  },
  {
    id: "bill-7",
    name: "Gym Membership",
    amount: 50.00,
    category: "Health",
    dueDate: new Date(new Date().getFullYear(), new Date().getMonth(), 10).toISOString(),
    isRecurring: true,
    recurringFrequency: "Monthly",
    paymentMethod: "Debit Card",
    status: "paid",
    createdAt: new Date(new Date().getFullYear(), new Date().getMonth() - 4, 10).toISOString(),
  },
  {
    id: "bill-8",
    name: "Tax Payment",
    amount: 350.00,
    category: "Other",
    dueDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 15).toISOString(),
    isRecurring: false,
    status: "pending",
    createdAt: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString(),
  },
  {
    id: "bill-9",
    name: "Water Bill",
    amount: 45.75,
    category: "Utilities",
    dueDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 3).toISOString(),
    isRecurring: true,
    recurringFrequency: "Monthly",
    status: "pending",
    createdAt: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 25).toISOString(),
  },
  {
    id: "bill-10",
    name: "Amazon Prime",
    amount: 14.99,
    category: "Subscriptions",
    dueDate: new Date(new Date().getFullYear(), new Date().getMonth(), 28).toISOString(),
    isRecurring: true,
    recurringFrequency: "Monthly",
    paymentMethod: "Credit Card",
    status: "pending",
    createdAt: new Date(new Date().getFullYear(), new Date().getMonth() - 5, 28).toISOString(),
  }
];

// Update bill statuses based on due dates
const updateBillStatuses = (bills: Bill[]): Bill[] => {
  const now = new Date();
  
  return bills.map(bill => {
    const dueDate = new Date(bill.dueDate);
    
    // If the bill is already paid, don't change the status
    if (bill.status === "paid") {
      return bill;
    }
    
    // If due date has passed, mark as overdue
    if (dueDate < now) {
      return { ...bill, status: "overdue" };
    }
    
    return bill;
  });
};

export function useBillsData() {
  const [bills, setBills] = useState<Bill[]>([]);
  
  // Load initial data
  useEffect(() => {
    // In a real app, this would fetch from an API or database
    const updatedBills = updateBillStatuses(initialBills);
    setBills(updatedBills);
  }, []);
  
  // Add a new bill
  const addBill = (bill: Bill) => {
    setBills(prev => [...prev, bill]);
  };
  
  // Update a bill
  const updateBill = (id: string, updatedFields: Partial<Bill>) => {
    setBills(prev => 
      prev.map(bill => 
        bill.id === id ? { ...bill, ...updatedFields } : bill
      )
    );
  };
  
  // Delete a bill
  const deleteBill = (id: string) => {
    setBills(prev => prev.filter(bill => bill.id !== id));
  };
  
  return {
    bills,
    addBill,
    updateBill,
    deleteBill,
  };
}