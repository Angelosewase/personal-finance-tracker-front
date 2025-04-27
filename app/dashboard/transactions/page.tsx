"use client";

import { useState } from "react";
import { DateRangePicker } from "@/components/transactions/date-range-picker";
import { TransactionFilters } from "@/components/transactions/transactions-filters";
import { TransactionList } from "@/components/transactions/transactions-list";
import { TransactionSummary } from "@/components/transactions/transactions-summary";
import { AddTransactionButton } from "@/components/transactions/add-transactions-buton";
import { TransactionSearchInput } from "@/components/transactions/transactions-search-input";
import { SpendingChart } from "@/components/transactions/spending-chart";

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <AddTransactionButton />
        </div>

        {/* Summary Cards */}
        <TransactionSummary />

        {/* Chart */}
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Recent Spending</h2>
          <SpendingChart />
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <TransactionSearchInput 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <DateRangePicker />
          </div>
          <TransactionFilters />
        </div>

        {/* Transaction List */}
        <TransactionList searchQuery={searchQuery} />
      </div>
    </main>
  );
}