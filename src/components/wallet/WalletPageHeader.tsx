import React from 'react';

interface WalletPageHeaderProps {
  onCreateWallet: () => void;
}

const WalletPageHeader: React.FC<WalletPageHeaderProps> = ({ onCreateWallet }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">My Wallets</h1>
        <p className="text-slate-600 mt-2">
          Manage your digital wallets and balances
        </p>
      </div>
      <button
        onClick={onCreateWallet}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 hover:cursor-pointer transition-colors font-medium"
      >
        Create New Wallet
      </button>
    </div>
  );
};

export default WalletPageHeader;