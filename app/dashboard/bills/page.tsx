"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import BillsHeader from "@/components/bills/bills-header";
import BillsSummary from "@/components/bills/bills-summary";
import BillsList from "@/components/bills/bills-list";
import BillsChart from "@/components/bills/bills-chart";
import AddBillDialog from "@/components/bills/add-bill-dialog";
import { useBillsData } from "@/hooks/use-bills-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UpcomingBills from "@/components/bills/upcoming-billls";

export default function BillsPage() {
  const [isAddBillOpen, setIsAddBillOpen] = useState(false);
  const { bills, addBill, updateBill, deleteBill } = useBillsData();

  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col gap-8">
        <BillsHeader 
          onAddBill={() => setIsAddBillOpen(true)}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BillsSummary bills={bills} className="md:col-span-2 items-start" />
          <UpcomingBills bills={bills} className="md:col-span-1" />
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Bills</TabsTrigger>
            <TabsTrigger value="recurring">Recurring</TabsTrigger>
            <TabsTrigger value="one-time">One-time</TabsTrigger>
            <TabsTrigger value="paid">Paid</TabsTrigger>
            <TabsTrigger value="unpaid">Unpaid</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <BillsList 
                bills={bills} 
                onUpdateBill={updateBill} 
                onDeleteBill={deleteBill}
                className="lg:col-span-2" 
              />
              <BillsChart bills={bills} className="lg:col-span-1" />
            </div>
          </TabsContent>
          
          <TabsContent value="recurring" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <BillsList 
                bills={bills.filter(bill => bill.isRecurring)} 
                onUpdateBill={updateBill} 
                onDeleteBill={deleteBill}
                className="lg:col-span-2" 
              />
              <BillsChart 
                bills={bills.filter(bill => bill.isRecurring)} 
                className="lg:col-span-1" 
              />
            </div>
          </TabsContent>
          
          <TabsContent value="one-time" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <BillsList 
                bills={bills.filter(bill => !bill.isRecurring)} 
                onUpdateBill={updateBill} 
                onDeleteBill={deleteBill}
                className="lg:col-span-2" 
              />
              <BillsChart 
                bills={bills.filter(bill => !bill.isRecurring)} 
                className="lg:col-span-1" 
              />
            </div>
          </TabsContent>
          
          <TabsContent value="paid" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <BillsList 
                bills={bills.filter(bill => bill.status === 'paid')} 
                onUpdateBill={updateBill} 
                onDeleteBill={deleteBill}
                className="lg:col-span-2" 
              />
              <BillsChart 
                bills={bills.filter(bill => bill.status === 'paid')} 
                className="lg:col-span-1" 
              />
            </div>
          </TabsContent>
          
          <TabsContent value="unpaid" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <BillsList 
                bills={bills.filter(bill => bill.status !== 'paid')} 
                onUpdateBill={updateBill} 
                onDeleteBill={deleteBill}
                className="lg:col-span-2" 
              />
              <BillsChart 
                bills={bills.filter(bill => bill.status !== 'paid')} 
                className="lg:col-span-1" 
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* <AddBillDialog 
        isOpen={isAddBillOpen}
        onOpenChange={setIsAddBillOpen}
        onAddBill={addBill} 
      /> */}
    </main>
  );
}