"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bill } from "@/types/models/bill";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/formatters";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BillsChartProps {
  bills: Bill[];
  className?: string;
}

export default function BillsChart({ bills, className }: BillsChartProps) {
  // Calculate category breakdown
  const categoryData = useMemo(() => {
    const categories: Record<string, number> = {};
    
    bills.forEach(bill => {
      if (!categories[bill.category]) {
        categories[bill.category] = 0;
      }
      categories[bill.category] += bill.amount;
    });
    
    return Object.entries(categories).map(([name, value]) => ({
      name,
      value
    }));
  }, [bills]);
  
  // Calculate monthly spending (last 6 months)
  const monthlyData = useMemo(() => {
    const months: Record<string, { total: number, paid: number, unpaid: number }> = {};
    const today = new Date();
    
    // Initialize last 6 months
    for (let i = 5; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthKey = date.toLocaleString('default', { month: 'short', year: '2-digit' });
      months[monthKey] = { total: 0, paid: 0, unpaid: 0 };
    }
    
    bills.forEach(bill => {
      const dueDate = new Date(bill.dueDate);
      // Only consider bills from the last 6 months
      const monthDiff = (today.getFullYear() - dueDate.getFullYear()) * 12 + 
                         (today.getMonth() - dueDate.getMonth());
      
      if (monthDiff >= 0 && monthDiff < 6) {
        const monthKey = dueDate.toLocaleString('default', { month: 'short', year: '2-digit' });
        
        if (months[monthKey]) {
          months[monthKey].total += bill.amount;
          
          if (bill.status === "paid") {
            months[monthKey].paid += bill.amount;
          } else {
            months[monthKey].unpaid += bill.amount;
          }
        }
      }
    });
    
    return Object.entries(months).map(([name, data]) => ({
      name,
      ...data
    }));
  }, [bills]);
  
  // Chart colors
  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))"
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-md shadow-sm p-2 text-xs">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    
    return null;
  };

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Spending Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="category">
          <TabsList className="mb-6">
            <TabsTrigger value="category">By Category</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          
          <TabsContent value="category" className="h-[300px] mt-0">
            {categoryData.length > 0 ? (
              <div className="flex flex-col items-center">
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      paddingAngle={2}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {categoryData.map((entry, index) => (
                    <div key={`legend-${index}`} className="flex items-center text-xs">
                      <div 
                        className="w-3 h-3 rounded-sm mr-1"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="mr-4">{entry.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                No data available
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="monthly" className="h-[300px] mt-0">
            {monthlyData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={monthlyData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis 
                    tickFormatter={(value) => formatCurrency(value, { notation: 'compact' })} 
                    fontSize={12}
                  />
                  <Tooltip 
                    formatter={(value) => formatCurrency(Number(value))}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))', 
                      borderRadius: '0.5rem'
                    }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="paid" 
                    stackId="a" 
                    fill="hsl(var(--chart-2))" 
                    name="Paid"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="unpaid" 
                    stackId="a" 
                    fill="hsl(var(--chart-1))" 
                    name="Unpaid"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                No data available
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}