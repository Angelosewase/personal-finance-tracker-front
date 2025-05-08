"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Bill } from "@/types/models/bill";
import { formatCurrency, formatDateRelative } from "@/lib/formatters";
import { Badge } from "@/components/ui/badge";

interface UpcomingBillsProps {
  bills: Bill[];
  className?: string;
}

export default function UpcomingBills({ bills, className }: UpcomingBillsProps) {
  // Get current date
  const now = new Date();
  
  // Filter and sort upcoming bills (due within the next 30 days and not paid)
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(now.getDate() + 30);
  
  const upcomingBills = bills
    .filter(bill => {
      const dueDate = new Date(bill.dueDate);
      return dueDate > now && 
             dueDate <= thirtyDaysFromNow && 
             bill.status !== "paid";
    })
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5); // Get 5 closest upcoming bills

  // Function to get status badge
  const getStatusBadge = (bill: Bill) => {
    const dueDate = new Date(bill.dueDate);
    const daysUntilDue = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilDue <= 3) {
      return <Badge variant="destructive">Due soon</Badge>;
    } else if (daysUntilDue <= 7) {
      return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Coming up</Badge>;
    } else {
      return <Badge variant="outline" className="bg-emerald-50 text-emerald-800 border-emerald-200">Upcoming</Badge>;
    }
  };

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Upcoming Bills</CardTitle>
      </CardHeader>
      <CardContent>
        {upcomingBills.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No upcoming bills for the next 30 days
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingBills.map(bill => (
              <div 
                key={bill.id} 
                className="flex items-center justify-between p-3 rounded-lg border bg-card/50 hover:bg-card/80 transition-colors"
              >
                <div className="flex flex-col">
                  <span className="font-medium">{bill.name}</span>
                  <span className="text-xs text-muted-foreground">{formatDateRelative(bill.dueDate)}</span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="font-semibold">{formatCurrency(bill.amount)}</span>
                  {getStatusBadge(bill)}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}