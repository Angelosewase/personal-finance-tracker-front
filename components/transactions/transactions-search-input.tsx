import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface TransactionSearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function TransactionSearchInput({ value, onChange }: TransactionSearchInputProps) {
  return (
    <div className="relative w-full md:w-[300px]">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Search transactions..."
        className="pl-10"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}