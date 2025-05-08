"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bill } from "@/types/models/bill";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/formatters";
import { ArrowUpIcon, ArrowDownIcon, PercentIcon, CalendarIcon } from "lucide-react";

interface BillsSummaryProps {
  bills: Bill[];
  className?: string;
}

export default function BillsSummary({ bills, className }: BillsSummaryProps) {
  // Calculate total bills amount
  const totalAmount = bills.reduce((sum, bill) => sum + bill.amount, 0);
  
  // Calculate total paid
  const totalPaid = bills
    .filter(bill => bill.status === "paid")
    .reduce((sum, bill) => sum + bill.amount, 0);
  
  // Calculate total due
  const totalDue = bills
    .filter(bill => bill.status !== "paid")
    .reduce((sum, bill) => sum + bill.amount, 0);
  
  // Calculate percentage paid
  const percentPaid = totalAmount > 0 
    ? Math.round((totalPaid / totalAmount) * 100) 
    : 0;
  
  // Get due this month
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const dueThisMonth = bills
    .filter(bill => {
      const dueDate = new Date(bill.dueDate);
      return dueDate.getMonth() === currentMonth && 
             dueDate.getFullYear() === currentYear &&
             bill.status !== "paid";
    })
    .reduce((sum, bill) => sum + bill.amount, 0);

  return (
    <div className={cn("grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4", className)}>
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Bills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalAmount)}</div>
          <div className="text-xs text-muted-foreground mt-1">
            {bills.length} bills
          </div>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Paid
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalPaid)}</div>
          <div className="flex items-center gap-1 mt-1">
            <ArrowUpIcon className="h-3 w-3 text-green-500" />
            <span className="text-xs text-green-500">{percentPaid}% of total</span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Due
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalDue)}</div>
          <div className="flex items-center gap-1 mt-1">
            <ArrowDownIcon className="h-3 w-3 text-destructive" />
            <span className="text-xs text-destructive">{100 - percentPaid}% of total</span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Due This Month
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(dueThisMonth)}</div>
          <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            <CalendarIcon className="h-3 w-3" />
            <span>For {new Date().toLocaleString('default', { month: 'long' })}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}