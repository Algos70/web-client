import React from 'react';

interface AddFundsModalProps {
  isOpen: boolean;
  amount: string;
  loading: boolean;
  onAmountChange: (amount: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

const AddFundsModal: React.FC<AddFundsModalProps> = ({
  isOpen,
  amount,
  loading,
  onAmountChange,
  onSubmit,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
        <h3 className="text-xl font-bold mb-4">Add Funds</h3>
        <form onSubmit={onSubmit}>
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
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 hover:cursor-pointer transition-colors disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Funds"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFundsModal;