import React, { useState } from "react";
import type { Wallet } from "../../lib/graphql/types";

interface WalletCardProps {
  wallet: Wallet;
  onDelete?: (walletId: string) => void;
  onAddFunds?: (walletId: string) => void;
  onTransfer?: (walletId: string) => void;
  isLoading?: boolean;
}

const WalletCard: React.FC<WalletCardProps> = ({
  wallet,
  onDelete,
  onAddFunds,
  onTransfer,
  isLoading = false,
}) => {
  const [copied, setCopied] = useState(false);

  // Convert minor units to major units (e.g., cents to dollars)
  const formatCurrency = (amountMinor: number, currency: string): string => {
    const amount = amountMinor / 100; // Assuming 2 decimal places
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount);
  };

  // Generate color from currency hash
  const getCurrencyColor = (currency: string) => {
    // Simple hash function
    let hash = 0;
    for (let i = 0; i < currency.length; i++) {
      const char = currency.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }

    // Predefined color combinations for consistency
    const colors = [
      "from-blue-400 to-blue-600",
      "from-green-400 to-green-600",
      "from-purple-400 to-purple-600",
      "from-red-400 to-red-600",
      "from-yellow-400 to-yellow-600",
      "from-pink-400 to-pink-600",
      "from-indigo-400 to-indigo-600",
      "from-teal-400 to-teal-600",
      "from-orange-400 to-orange-600",
      "from-cyan-400 to-cyan-600",
    ];

    // Use hash to select color
    const colorIndex = Math.abs(hash) % colors.length;
    return colors[colorIndex];
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Card Header with Gradient */}
      <div
        className={`bg-gradient-to-r ${getCurrencyColor(
          wallet.currency
        )} p-6 text-white`}
      >
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              <h3 className="text-xl font-bold">
                {wallet.currency.toUpperCase()}
              </h3>
            </div>
            <div className="flex items-center space-x-2">
              <p className="text-white/80 text-sm">
                Wallet ID: {wallet.id.slice(-8)}
              </p>
              <button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(wallet.id);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  } catch (err) {
                    console.error("Failed to copy wallet ID:", err);
                  }
                }}
                className="text-white/60 hover:text-white hover:cursor-pointer transition-colors p-1"
                title="Copy full wallet ID"
              >
                {copied ? (
                  <svg
                    className="w-4 h-4 text-green-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white/80 text-sm">Balance</p>
            <p className="text-2xl font-bold">
              {formatCurrency(wallet.balanceMinor, wallet.currency)}
            </p>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-slate-500 mb-1">Created</p>
            <p className="text-sm font-medium text-slate-900">
              {new Date(parseInt(wallet.createdAt)).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-500 mb-1">Last Updated</p>
            <p className="text-sm font-medium text-slate-900">
              {new Date(parseInt(wallet.updatedAt)).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          {onAddFunds && (
            <button
              onClick={() => onAddFunds(wallet.id)}
              disabled={isLoading}
              className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 hover:cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
            >
              Add Funds
            </button>
          )}

          {onTransfer && (
            <button
              onClick={() => onTransfer(wallet.id)}
              disabled={isLoading}
              className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 hover:cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
            >
              Transfer
            </button>
          )}

          {onDelete && (
            <button
              onClick={() => onDelete(wallet.id)}
              disabled={isLoading}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 hover:cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletCard;
