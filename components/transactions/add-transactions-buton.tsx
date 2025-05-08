"use client";

import { useState, FormEvent } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import transactionService from "@/services/transactionService";
import { TransactionType, TransactionStatus } from "@/types/models/transaction";

export function AddTransactionButton() {
  const [open, setOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<string>("expense");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    category: "",
    date: new Date().toISOString().split("T")[0]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  const resetForm = () => {
    setFormData({
      amount: "",
      description: "",
      category: "",
      date: new Date().toISOString().split("T")[0]
    });
    setTransactionType("expense");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.description || !formData.category || !formData.date) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    try {
      setLoading(true);
      
      // Prepare data based on transaction type
      const amount = parseFloat(formData.amount);
      const finalAmount = transactionType === "expense" ? -Math.abs(amount) : Math.abs(amount);
      
      await transactionService.createTransaction({
        amount: finalAmount,
        type: transactionType === "expense" ? TransactionType.DEBIT : TransactionType.CREDIT,
        description: formData.description,
        category: formData.category,
        date: formData.date,
        status: TransactionStatus.COMPLETED
      });
      
      toast.success("Transaction added successfully");
      setOpen(false);
      resetForm();
    } catch (error) {
      console.error("Failed to add transaction:", error);
      toast.error("Failed to add transaction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      setOpen(newOpen);
      if (!newOpen) {
        resetForm();
      }
    }}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Transaction</DialogTitle>
            <DialogDescription>
              Enter the details of your transaction below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <RadioGroup
              value={transactionType}
              className="grid grid-cols-2 gap-4"
              onValueChange={setTransactionType}
            >
              <Label
                htmlFor="expense"
                className={`flex cursor-pointer items-center justify-center rounded-md border border-muted p-3 ${
                  transactionType === "expense"
                    ? "border-primary bg-primary text-primary-foreground"
                    : ""
                }`}
              >
                <RadioGroupItem
                  value="expense"
                  id="expense"
                  className="sr-only"
                />
                Expense
              </Label>
              <Label
                htmlFor="income"
                className={`flex cursor-pointer items-center justify-center rounded-md border border-muted p-3 ${
                  transactionType === "income"
                    ? "border-primary bg-primary text-primary-foreground"
                    : ""
                }`}
              >
                <RadioGroupItem
                  value="income"
                  id="income"
                  className="sr-only"
                />
                Income
              </Label>
            </RadioGroup>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <div className="col-span-3 flex rounded-md border">
                <div className="flex items-center px-3 text-sm text-muted-foreground">
                  $
                </div>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  required
                  value={formData.amount}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                placeholder="What was this for?"
                className="col-span-3"
                required
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select 
                required 
                value={formData.category}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger id="category" className="col-span-3">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {transactionType === "expense" ? (
                    <>
                      <SelectItem value="Food & Dining">Food & Dining</SelectItem>
                      <SelectItem value="Shopping">Shopping</SelectItem>
                      <SelectItem value="Housing">Housing</SelectItem>
                      <SelectItem value="Transportation">Transportation</SelectItem>
                      <SelectItem value="Entertainment">Entertainment</SelectItem>
                      <SelectItem value="Health & Wellness">Health & Wellness</SelectItem>
                      <SelectItem value="Utilities">Utilities</SelectItem>
                      <SelectItem value="Travel">Travel</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="Salary">Salary</SelectItem>
                      <SelectItem value="Freelance">Freelance</SelectItem>
                      <SelectItem value="Investment">Investment</SelectItem>
                      <SelectItem value="Gift">Gift</SelectItem>
                      <SelectItem value="Refund">Refund</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                className="col-span-3"
                required
                value={formData.date}
                onChange={handleChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => setOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Transaction"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}