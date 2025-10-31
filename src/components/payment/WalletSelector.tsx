import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { formatCurrency } from "../../lib/utils/currency";
import type { Wallet } from "../../lib/graphql/types";

interface WalletSelectorProps {
  compatibleWallets: Wallet[];
  selectedWalletId: string;
  onWalletSelect: (walletId: string) => void;
  totals: Record<string, number>;
  cartCurrencies: string[];
  onManageWallets: () => void;
}

export default function WalletSelector({
  compatibleWallets,
  selectedWalletId,
  onWalletSelect,
  totals,
  cartCurrencies,
  onManageWallets,
}: WalletSelectorProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">
        Select Wallet
      </h2>
      
      {compatibleWallets.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-slate-500 mb-4">
            No compatible wallets found for currencies: {cartCurrencies.join(", ")}
          </p>
          <button
            onClick={onManageWallets}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 hover:cursor-pointer"
          >
            Manage Wallets
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {compatibleWallets.map((wallet) => {
            const requiredAmount = totals[wallet.currency] || 0;
            const walletBalance = parseInt(wallet.balanceMinor);
            const hasSufficientBalance = walletBalance >= requiredAmount;
            
            return (
              <label
                key={wallet.id}
                className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedWalletId === wallet.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-200 hover:border-slate-300"
                } ${
                  !hasSufficientBalance ? "opacity-50" : ""
                }`}
              >
                <input
                  type="radio"
                  name="wallet"
                  value={wallet.id}
                  checked={selectedWalletId === wallet.id}
                  onChange={(e) => onWalletSelect(e.target.value)}
                  disabled={!hasSufficientBalance}
                  className="sr-only"
                />
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center">
                      <span className="font-medium text-slate-900">
                        {wallet.currency} Wallet
                      </span>
                      {selectedWalletId === wallet.id && (
                        <CheckCircleIcon className="h-5 w-5 text-blue-500 ml-2" />
                      )}
                    </div>
                    <p className="text-sm text-slate-600">
                      Balance: {formatCurrency(wallet.balanceMinor, wallet.currency)}
                    </p>
                    {!hasSufficientBalance && (
                      <p className="text-sm text-red-600">
                        Insufficient balance (need {formatCurrency(requiredAmount.toString(), wallet.currency)})
                      </p>
                    )}
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}