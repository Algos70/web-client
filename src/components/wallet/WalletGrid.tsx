import React from 'react';
import WalletCard from './WalletCard';
import type { Wallet } from '../../lib/graphql/types';

interface WalletGridProps {
  wallets: Wallet[];
  onDelete: (walletId: string) => void;
  onAddFunds: (walletId: string) => void;
  onTransfer: (walletId: string) => void;
  isLoading: boolean;
}

const WalletGrid: React.FC<WalletGridProps> = ({
  wallets,
  onDelete,
  onAddFunds,
  onTransfer,
  isLoading,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {wallets.map((wallet) => (
        <WalletCard
          key={wallet.id}
          wallet={wallet}
          onDelete={onDelete}
          onAddFunds={onAddFunds}
          onTransfer={onTransfer}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};

export default WalletGrid;