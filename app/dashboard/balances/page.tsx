import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface AccountCardProps {
  type: string
  bankName?: string
  accountNumber: string
  amount: number
  logo?: React.ReactNode
  onRemove?: () => void
  onDetails?: () => void
}

function AccountCard({ type, bankName, accountNumber, amount, logo, onRemove, onDetails }: AccountCardProps) {
  return (
    <div className="p-4 border shadow-sm rounded-md">
      <div className="flex justify-between items-center mb-1">
        <h3 className="font-medium">{type}</h3>
        {(bankName || logo) && (
          <div className="flex items-center">
            {bankName && <span className="text-xs mr-1">{bankName}</span>}
            {logo && logo}
          </div>
        )}
      </div>
      <div className="text-sm text-muted-foreground mb-2">Account Number</div>
      <div className="text-lg font-semibold mb-1">{accountNumber}</div>
      <div className="text-sm text-muted-foreground mb-2">Total amount</div>
      <div className="text-xl font-semibold mb-3">${amount}</div>
      <div className="flex justify-between">
        <Button 
          variant="ghost" 
          className="text-blue-500 hover:text-blue-700 px-0"
          onClick={onRemove}
        >
          Remove
        </Button>
        <Button 
          variant="outline" 
          className="bg-teal-500 hover:bg-teal-600 text-white border-none flex items-center"
          onClick={onDetails}
        >
          Details
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </Button>
      </div>
    </div>
  )
}

function AddEditCard({ onAdd, onEdit }: { onAdd?: () => void, onEdit?: () => void }) {
  return (
    <Card className="p-6 flex flex-col justify-center">
      <Button 
        className="bg-teal-500 hover:bg-teal-600 text-white w-full mb-2"
        onClick={onAdd}
      >
        Add Accounts
      </Button>
      <Button 
        variant="outline" 
        className="w-full"
        onClick={onEdit}
      >
        Edit Accounts
      </Button>
    </Card>
  )
}

export default function BalancesPage() {
  const masterCardLogo = (
    <div className="w-6 h-6">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#EB001B" fillOpacity="0.8" />
        <circle cx="12" cy="12" r="12" fill="#F79E1B" fillOpacity="0.8" style={{ mixBlendMode: 'multiply' }} />
      </svg>
    </div>
  )

  const visaLogo = (
    <div className="w-10 h-4">
      <svg viewBox="0 0 40 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.632 12.74H8.843L11.933 0.26H16.722L13.632 12.74Z" fill="#00579F"/>
        <path d="M29.302 0.52C28.424 0.16 27.026 0 25.347 0C22.257 0 19.947 1.56 19.927 3.77C19.907 5.46 21.618 6.37 22.917 6.93C24.236 7.49 24.656 7.85 24.656 8.34C24.636 9.09 23.717 9.45 22.857 9.45C21.618 9.45 20.947 9.25 19.887 8.79L19.347 8.53L18.767 11.83C19.807 12.29 21.738 12.7 23.737 12.72C27.026 12.72 29.302 11.18 29.322 8.81C29.342 7.43 28.464 6.37 26.486 5.57C25.307 5.05 24.596 4.71 24.596 4.16C24.616 3.64 25.167 3.12 26.486 3.12C27.585 3.1 28.384 3.36 29.002 3.62L29.382 3.8L29.962 0.62L29.302 0.52Z" fill="#00579F"/>
        <path d="M33.951 8.32C34.291 7.43 35.45 4.29 35.45 4.29C35.43 4.33 35.77 3.38 35.97 2.79L36.23 4.14C36.23 4.14 36.93 7.53 37.09 8.32C36.37 8.32 34.811 8.32 33.951 8.32ZM38.329 0.26H35.37C34.531 0.26 33.891 0.5 33.531 1.41L28.662 12.74H32.012C32.012 12.74 32.652 11.03 32.772 10.7C33.151 10.7 36.87 10.7 37.369 10.7C37.469 11.13 37.809 12.74 37.809 12.74H40.779L38.329 0.26Z" fill="#00579F"/>
        <path d="M7.224 0.26L4.054 8.71L3.735 7.15C3.195 5.33 1.496 3.36 0 2.27L2.896 12.72H6.284L11.153 0.26H7.224Z" fill="#00579F"/>
        <path d="M3.315 0.26H0.02L0 0.5C2.556 1.17 4.254 2.89 4.954 5.01L4.234 1.43C4.094 0.52 3.775 0.28 3.315 0.26Z" fill="#FAA61A"/>
      </svg>
    </div>
  )

  return (
    <div className="container p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AccountCard
          type="Credit Card"
          bankName="Master Card"
          accountNumber="3388 4556 8860 8***"
          amount={25000}
          logo={masterCardLogo}
        />
        <AccountCard
          type="Checking"
          bankName="All Bank Ltd"
          accountNumber="693 456 69 9***"
          amount={25000}
          logo={visaLogo}
        />
        <AccountCard
          type="Savings"
          bankName="Briar Bank Ltd"
          accountNumber="133 456 886 8***"
          amount={25000}
        />
        <AccountCard
          type="Investment"
          bankName="All Bank Ltd"
          accountNumber="698 456 866 2***"
          amount={25000}
        />
        <AccountCard
          type="Loan"
          bankName="City Bank Ltd"
          accountNumber="363 456 896 6***"
          amount={25000}
        />
        <AddEditCard />
      </div>
    </div>
  )
}