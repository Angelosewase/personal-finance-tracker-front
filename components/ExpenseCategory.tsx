import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

interface ExpenseCategoryProps {
  icon: ReactNode;
  title: string;
  amount: number;
}

const ExpenseCategory = ({ icon, title, amount }: ExpenseCategoryProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            {icon}
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">{title}</h3>
            <p className="text-lg font-semibold">${amount.toFixed(2)}</p>
          </div>
        </div>
        <Button variant="outline" className="text-emerald-600 border-emerald-600 hover:bg-emerald-50">
          Adjust
        </Button>
      </div>
    </Card>
  );
};

export default ExpenseCategory;