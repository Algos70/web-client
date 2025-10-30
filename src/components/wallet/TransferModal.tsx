import React from 'react';

interface TransferModalProps {
  isOpen: boolean;
  targetWalletId: string;
  amount: string;
  loading: boolean;
  onTargetWalletIdChange: (walletId: string) => void;
  onAmountChange: (amount: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

const TransferModal: React.FC<TransferModalProps> = ({
  isOpen,
  targetWalletId,
  amount,
  loading,
  onTargetWalletIdChange,
  onAmountChange,
  onSubmit,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
        <h3 className="text-xl font-bold mb-4">Transfer Funds</h3>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Target Wallet ID
            </label>
            <input
              type="text"
              value={targetWalletId}
              onChange={(e) => onTargetWalletIdChange(e.target.value)}
              placeholder="Enter target wallet ID"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <p className="text-xs text-slate-500 mt-1">
              Enter the wallet ID you want to transfer funds to
            </p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => onAmountChange(e.target.value)}
              placeholder="0.00"
              step="0.01"
              min="0"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 hover:cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 hover:cursor-pointer transition-colors disabled:opacity-50"
            >
              {loading ? "Transferring..." : "Transfer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransferModal;