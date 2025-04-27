"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle, Download, Filter } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface BillsHeaderProps {
  onAddBill: () => void;
}

export default function BillsHeader({ onAddBill }: BillsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bills</h1>
        <p className="text-muted-foreground mt-1">
          Manage your bills and track your expenses
        </p>
      </div>
      <div className="flex items-center gap-3 self-start">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem>CSV</DropdownMenuItem>
            <DropdownMenuItem>PDF</DropdownMenuItem>
            <DropdownMenuItem>Excel</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button onClick={onAddBill} className="h-9 gap-1">
          <PlusCircle className="h-4 w-4" />
          <span>Add Bill</span>
        </Button>
      </div>
    </div>
  );
}