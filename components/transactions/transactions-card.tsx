import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Transaction } from "@/types/models/transaction";
import { formatCurrency, formatDate } from "@/lib/formatters";

interface TransactionCardProps {
  transaction: Transaction;
}

export function TransactionCard({ transaction }: TransactionCardProps) {
  const { description, amount, date, category } = transaction;
  const isExpense = amount < 0;

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-0">
        <div className="flex items-center gap-4 p-4">
          <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${
            isExpense ? 'bg-red-100' : 'bg-green-100'
          }`}>
            <span className={`text-lg font-semibold ${
              isExpense ? 'text-red-600' : 'text-green-600'
            }`}>
              {isExpense ? '-' : '+'}
            </span>
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="font-medium">{description}</p>
              <p className={`font-semibold ${
                isExpense ? 'text-red-600' : 'text-green-600'
              }`}>
                {formatCurrency(amount)}
              </p>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <p>{formatDate(date)}</p>
              <Badge variant="outline" className="ml-2">
                {category}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}