
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, ShoppingBag, Car, Tv, Package2, MoreHorizontal } from "lucide-react";
import ExpenseCategory from "@/components/ExpenseCategory";
import GoalGauge from "@/components/GoalGauge";
import SavingsSummary from "@/components/SavingsSumaary";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Goals</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Savings Goal Card */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="space-y-1">
                <h2 className="text-sm font-medium text-gray-500">Savings Goal</h2>
                <select className="text-sm text-gray-600 bg-transparent border-none focus:ring-0">
                  <option>01 May - 31 May</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded bg-emerald-100">
                    <svg className="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17L4 12"/>
                    </svg>
                  </span>
                  <span className="text-sm text-gray-600">Target Achieved</span>
                </div>
                <p className="text-2xl font-semibold">$12,500</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded bg-gray-100">
                    <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 8v8m-4-4h8"/>
                    </svg>
                  </span>
                  <span className="text-sm text-gray-600">This month Target</span>
                </div>
                <p className="text-2xl font-semibold">$20,000</p>
              </div>
            </div>
            
            <GoalGauge value={62.5} />
            
            <div className="mt-4 flex justify-center">
              <Button variant="outline" className="text-emerald-600 border-emerald-600 hover:bg-emerald-50">
                Adjust Goal
              </Button>
            </div>
          </Card>

          {/* Savings Summary Card */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-sm font-medium text-gray-500">Saving Summary</h2>
              <select className="text-sm text-gray-600 bg-transparent border-none focus:ring-0">
                <option>Mar 2022</option>
              </select>
            </div>
            <SavingsSummary />
          </Card>
        </div>

        {/* Expenses Categories */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Expenses Goals by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ExpenseCategory
              icon={<Home className="h-5 w-5" />}
              title="Housing"
              amount={250.00}
            />
            <ExpenseCategory
              icon={<ShoppingBag className="h-5 w-5" />}
              title="Food"
              amount={250.00}
            />
            <ExpenseCategory
              icon={<Car className="h-5 w-5" />}
              title="Transportation"
              amount={250.00}
            />
            <ExpenseCategory
              icon={<Tv className="h-5 w-5" />}
              title="Entertainment"
              amount={250.00}
            />
            <ExpenseCategory
              icon={<Package2 className="h-5 w-5" />}
              title="Shopping"
              amount={250.00}
            />
            <ExpenseCategory
              icon={<MoreHorizontal className="h-5 w-5" />}
              title="Others"
              amount={250.00}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;