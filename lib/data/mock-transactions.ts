export interface Transaction {
    id: string;
    date: string;
    description: string;
    amount: number;  // Negative for expenses, positive for income
    category: string;
    paymentMethod?: string;
    notes?: string;
  }
  
  export const mockTransactions: Transaction[] = [
    {
      id: "t1",
      date: "2023-04-01",
      description: "Salary",
      amount: 5000,
      category: "Income",
      paymentMethod: "Direct Deposit"
    },
    {
      id: "t2",
      date: "2023-04-02",
      description: "Grocery Shopping",
      amount: -120.50,
      category: "Food & Dining",
      paymentMethod: "Credit Card"
    },
    {
      id: "t3",
      date: "2023-04-03",
      description: "Electric Bill",
      amount: -85.20,
      category: "Utilities",
      paymentMethod: "Bank Transfer"
    },
    {
      id: "t4",
      date: "2023-04-05",
      description: "Movie Tickets",
      amount: -30,
      category: "Entertainment",
      paymentMethod: "Debit Card"
    },
    {
      id: "t5",
      date: "2023-04-08",
      description: "Freelance Work",
      amount: 750,
      category: "Income",
      paymentMethod: "PayPal"
    },
    {
      id: "t6",
      date: "2023-04-10",
      description: "Gas Station",
      amount: -45.80,
      category: "Transportation",
      paymentMethod: "Credit Card"
    },
    {
      id: "t7",
      date: "2023-04-12",
      description: "Amazon Purchase",
      amount: -67.99,
      category: "Shopping",
      paymentMethod: "Credit Card"
    },
    {
      id: "t8",
      date: "2023-04-15",
      description: "Rent Payment",
      amount: -1200,
      category: "Housing",
      paymentMethod: "Bank Transfer"
    },
    {
      id: "t9",
      date: "2023-04-18",
      description: "Pharmacy",
      amount: -35.45,
      category: "Health & Wellness",
      paymentMethod: "Debit Card"
    },
    {
      id: "t10",
      date: "2023-04-20",
      description: "Internet Bill",
      amount: -75,
      category: "Utilities",
      paymentMethod: "Bank Transfer"
    },
    {
      id: "t11",
      date: "2023-04-22",
      description: "Restaurant Dinner",
      amount: -82.75,
      category: "Food & Dining",
      paymentMethod: "Credit Card"
    },
    {
      id: "t12",
      date: "2023-04-25",
      description: "Uber Ride",
      amount: -22.50,
      category: "Transportation",
      paymentMethod: "Credit Card"
    },
    {
      id: "t13",
      date: "2023-04-28",
      description: "Phone Bill",
      amount: -65,
      category: "Utilities",
      paymentMethod: "Bank Transfer"
    },
    {
      id: "t14",
      date: "2023-04-29",
      description: "Dividend Payment",
      amount: 120,
      category: "Investment",
      paymentMethod: "Direct Deposit"
    },
    {
      id: "t15",
      date: "2023-04-30",
      description: "Gym Membership",
      amount: -50,
      category: "Health & Wellness",
      paymentMethod: "Bank Transfer"
    }
  ];