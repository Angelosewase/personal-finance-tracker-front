export interface Bill {
    id: string;
    name: string;
    amount: number;
    category: string;
    dueDate: string;
    isRecurring: boolean;
    recurringFrequency?: string;
    paymentMethod?: string;
    paymentDate?: string;
    note?: string;
    status: 'paid' | 'pending' | 'overdue';
    createdAt: string;
  }