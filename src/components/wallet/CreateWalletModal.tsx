import React from 'react';

interface CreateWalletModalProps {
  isOpen: boolean;
  currency: string;
  loading: boolean;
  onCurrencyChange: (currency: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

const CreateWalletModal: React.FC<CreateWalletModalProps> = ({
  isOpen,
  currency,
  loading,
  onCurrencyChange,
  onSubmit,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
        <h3 className="text-xl font-bold mb-4">Create New Wallet</h3>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Currency
            </label>
            <input
              type="text"
              value={currency}
              onChange={(e) => onCurrencyChange(e.target.value.toUpperCase())}
              placeholder="Enter currency code (e.g., USD, EUR)"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              maxLength={3}
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
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:cursor-pointer transition-colors disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Wallet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateWalletModal;