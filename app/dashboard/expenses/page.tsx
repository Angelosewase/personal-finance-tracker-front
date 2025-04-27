import ExpensesBreakdown from "@/components/ExpenseBreakdown";
import ExpensesChart from "@/components/ExpenseChart";
import { Card } from "@/components/ui/card";

const Expenses = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Expenses</h1>
        </div>

        <Card className="p-6">
          <ExpensesChart />
        </Card>

        <ExpensesBreakdown />
      </div>
    </div>
  );
};

export default Expenses;
