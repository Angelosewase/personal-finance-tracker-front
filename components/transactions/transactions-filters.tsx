"use client";

import { PlusCircle, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export function TransactionFilters() {
  const [showIncome, setShowIncome] = useState(true);
  const [showExpense, setShowExpense] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  const categories = [
    "Food & Dining",
    "Shopping",
    "Housing",
    "Transportation",
    "Entertainment",
    "Health & Wellness",
    "Utilities",
    "Travel",
    "Education",
    "Income",
    "Savings",
    "Investment"
  ];

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 whitespace-nowrap">
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Transaction Types</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={showIncome}
          onCheckedChange={setShowIncome}
        >
          Income
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showExpense}
          onCheckedChange={setShowExpense}
        >
          Expenses
        </DropdownMenuCheckboxItem>
        
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Categories</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <div className="max-h-[200px] overflow-y-auto">
          {categories.map((category) => (
            <DropdownMenuCheckboxItem
              key={category}
              checked={selectedCategories.includes(category)}
              onCheckedChange={() => toggleCategory(category)}
            >
              {category}
            </DropdownMenuCheckboxItem>
          ))}
        </div>
        
        <DropdownMenuSeparator />
        <div className="p-2">
          <Button
            size="sm" 
            variant="outline" 
            className="w-full"
            onClick={() => {
              setShowIncome(true);
              setShowExpense(true);
              setSelectedCategories([]);
            }}
          >
            Reset Filters
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}