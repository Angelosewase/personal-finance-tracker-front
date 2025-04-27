import { Card } from "@/components/ui/card";
import { Home, ShoppingBag, Car, Tv, Package2, MoreHorizontal } from "lucide-react";

interface ExpenseItemProps {
  title: string;
  amount: number;
  date: string;
}

const ExpenseItem = ({ title, amount, date }: ExpenseItemProps) => (
  <div className="flex justify-between items-center py-2">
    <div className="space-y-1">
      <p className="text-sm font-medium text-gray-900">{title}</p>
      <p className="text-xs text-gray-500">{date}</p>
    </div>
    <p className="text-sm font-medium">${amount.toFixed(2)}</p>
  </div>
);

interface CategoryBreakdownProps {
  icon: React.ReactNode;
  title: string;
  totalAmount: number;
  percentageChange: number;
  expenses: ExpenseItemProps[];
}

const CategoryBreakdown = ({ icon, title, totalAmount, percentageChange, expenses }: CategoryBreakdownProps) => (
  <Card className="p-6 space-y-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gray-100 rounded-lg">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
          <p className="text-lg font-semibold">${totalAmount.toFixed(2)}</p>
        </div>
      </div>
      <div className={`text-sm font-medium ${percentageChange >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
        {percentageChange >= 0 ? '+' : ''}{percentageChange}%
        <div className="text-xs text-gray-500">Compare to last month</div>
      </div>
    </div>
    <div className="space-y-2">
      {expenses.map((expense, index) => (
        <ExpenseItem key={index} {...expense} />
      ))}
    </div>
  </Card>
);

const ExpensesBreakdown = () => {
  const categories = [
    {
      icon: <Home className="h-5 w-5" />,
      title: "Housing",
      totalAmount: 250.00,
      percentageChange: 15,
      expenses: [
        { title: "House Rent", amount: 230.00, date: "17 May 2023" },
        { title: "Parking", amount: 20.00, date: "17 May 2023" },
      ]
    },
    {
      icon: <ShoppingBag className="h-5 w-5" />,
      title: "Food",
      totalAmount: 350.00,
      percentageChange: 0.8,
      expenses: [
        { title: "Grocery", amount: 230.00, date: "17 May 2023" },
        { title: "Restaurant bill", amount: 120.00, date: "17 May 2023" },
      ]
    },
    {
      icon: <Car className="h-5 w-5" />,
      title: "Transportation",
      totalAmount: 50.00,
      percentageChange: 12,
      expenses: [
        { title: "Taxi Fare", amount: 30.00, date: "17 May 2023" },
        { title: "Metro Card bill", amount: 20.00, date: "17 May 2023" },
      ]
    },
    {
      icon: <Tv className="h-5 w-5" />,
      title: "Entertainment",
      totalAmount: 80.00,
      percentageChange: 15,
      expenses: [
        { title: "Movie ticket", amount: 30.00, date: "17 May 2023" },
        { title: "iTunes", amount: 50.00, date: "17 May 2023" },
      ]
    },
    {
      icon: <Package2 className="h-5 w-5" />,
      title: "Shopping",
      totalAmount: 420.00,
      percentageChange: 25,
      expenses: [
        { title: "Shirt", amount: 230.00, date: "17 May 2023" },
        { title: "Jeans", amount: 190.00, date: "17 May 2023" },
      ]
    },
    {
      icon: <MoreHorizontal className="h-5 w-5" />,
      title: "Others",
      totalAmount: 50.00,
      percentageChange: 23,
      expenses: [
        { title: "Donation", amount: 30.00, date: "17 May 2023" },
        { title: "Gift", amount: 20.00, date: "17 May 2023" },
      ]
    }
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Expenses Breakdown</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <CategoryBreakdown key={index} {...category} />
        ))}
      </div>
    </div>
  );
};

export default ExpensesBreakdown;