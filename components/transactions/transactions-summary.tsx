"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon, DollarSign } from "lucide-react";
import { mockTransactions } from "@/lib/data/mock-transactions";
import { formatCurrency } from "@/lib/formatters";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TransactionSummary() {
  const [timeframe, setTimeframe] = useState("month");
  
  // Calculate summary statistics based on the mock data
  const income = mockTransactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
  
  const expenses = mockTransactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + t.amount, 0);
  
  const balance = income + expenses;

  // Calculate percentage changes (normally would be compared to previous periods)
  const incomeChange = +10.2;
  const expensesChange = -5.8;
  const balanceChange = +7.5;

  return (
    <div className="space-y-4">
      <Tabs defaultValue="month" className="w-full" onValueChange={setTimeframe}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Summary</h2>
          <TabsList>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="week" className="mt-4 space-y-0">
          <SummaryCards 
            income={income / 4} 
            expenses={expenses / 4} 
            balance={balance / 4} 
            incomeChange={incomeChange} 
            expensesChange={expensesChange} 
            balanceChange={balanceChange}
          />
        </TabsContent>
        
        <TabsContent value="month" className="mt-4 space-y-0">
          <SummaryCards 
            income={income} 
            expenses={expenses} 
            balance={balance} 
            incomeChange={incomeChange} 
            expensesChange={expensesChange} 
            balanceChange={balanceChange}
          />
        </TabsContent>
        
        <TabsContent value="year" className="mt-4 space-y-0">
          <SummaryCards 
            income={income * 12} 
            expenses={expenses * 12} 
            balance={balance * 12} 
            incomeChange={incomeChange} 
            expensesChange={expensesChange} 
            balanceChange={balanceChange}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface SummaryCardsProps {
  income: number;
  expenses: number;
  balance: number;
  incomeChange: number;
  expensesChange: number;
  balanceChange: number;
}

function SummaryCards({
  income,
  expenses,
  balance,
  incomeChange,
  expensesChange,
  balanceChange,
}: SummaryCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="transition-all hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Income</CardTitle>
          <ArrowUpIcon className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(income)}</div>
          <div className="flex items-center pt-1 text-xs text-muted-foreground">
            <span className={incomeChange > 0 ? "text-green-600" : "text-red-600"}>
              {incomeChange > 0 ? "+" : ""}{incomeChange}%
            </span>
            <span className="ml-1">from last period</span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="transition-all hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Expenses</CardTitle>
          <ArrowDownIcon className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(Math.abs(expenses))}</div>
          <div className="flex items-center pt-1 text-xs text-muted-foreground">
            <span className={expensesChange < 0 ? "text-green-600" : "text-red-600"}>
              {expensesChange > 0 ? "+" : ""}{expensesChange}%
            </span>
            <span className="ml-1">from last period</span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="transition-all hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Balance</CardTitle>
          <DollarSign className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(balance)}</div>
          <div className="flex items-center pt-1 text-xs text-muted-foreground">
            <span className={balanceChange > 0 ? "text-green-600" : "text-red-600"}>
              {balanceChange > 0 ? "+" : ""}{balanceChange}%
            </span>
            <span className="ml-1">from last period</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}