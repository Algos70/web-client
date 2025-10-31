import CreateWalletModal from "../wallet/CreateWalletModal";
import AddFundsModal from "../wallet/AddFundsModal";
import TransferModal from "../wallet/TransferModal";
import DeleteConfirmationModal from "../admin/modals/DeleteConfirmationModal";

interface WalletsModalsProps {
  // Create Wallet Modal
  showCreateForm: boolean;
  newWalletCurrency: string;
  createLoading: boolean;
  onCurrencyChange: (currency: string) => void;
  onCreateSubmit: (e: React.FormEvent) => void;
  onCreateClose: () => void;

  // Add Funds Modal
  showAddFundsModal: string | null;
  addFundsAmount: string;
  increaseLoading: boolean;
  onAddFundsAmountChange: (amount: string) => void;
  onAddFundsSubmit: (e: React.FormEvent) => void;
  onAddFundsClose: () => void;

  // Transfer Modal
  showTransferModal: string | null;
  transferTargetWalletId: string;
  transferAmount: string;
  transferLoading: boolean;
  onTransferTargetWalletIdChange: (id: string) => void;
  onTransferAmountChange: (amount: string) => void;
  onTransferSubmit: (e: React.FormEvent) => void;
  onTransferClose: () => void;

  // Delete Modal
  deleteModal: {
    isOpen: boolean;
    walletId: string;
    walletCurrency: string;
  };
  deleteLoading: boolean;
  onDeleteConfirm: () => void;
  onDeleteCancel: () => void;
}

export default function WalletsModals({
  showCreateForm,
  newWalletCurrency,
  createLoading,
  onCurrencyChange,
  onCreateSubmit,
  onCreateClose,
  showAddFundsModal,
  addFundsAmount,
  increaseLoading,
  onAddFundsAmountChange,
  onAddFundsSubmit,
  onAddFundsClose,
  showTransferModal,
  transferTargetWalletId,
  transferAmount,
  transferLoading,
  onTransferTargetWalletIdChange,
  onTransferAmountChange,
  onTransferSubmit,
  onTransferClose,
  deleteModal,
  deleteLoading,
  onDeleteConfirm,
  onDeleteCancel,
}: WalletsModalsProps) {
  return (
    <>
      <CreateWalletModal
        isOpen={showCreateForm}
        currency={newWalletCurrency}
        loading={createLoading}
        onCurrencyChange={onCurrencyChange}
        onSubmit={onCreateSubmit}
        onClose={onCreateClose}
      />

      <AddFundsModal
        isOpen={!!showAddFundsModal}
        amount={addFundsAmount}
        loading={increaseLoading}
        onAmountChange={onAddFundsAmountChange}
        onSubmit={onAddFundsSubmit}
        onClose={onAddFundsClose}
      />

      <TransferModal
        isOpen={!!showTransferModal}
        targetWalletId={transferTargetWalletId}
        amount={transferAmount}
        loading={transferLoading}
        onTargetWalletIdChange={onTransferTargetWalletIdChange}
        onAmountChange={onTransferAmountChange}
        onSubmit={onTransferSubmit}
        onClose={onTransferClose}
      />

      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        title="Delete Wallet"
        itemName={`${deleteModal.walletCurrency} Wallet`}
        itemType="wallet"
        warningMessage="All funds in this wallet will be lost permanently."
        onConfirm={onDeleteConfirm}
        onCancel={onDeleteCancel}
        loading={deleteLoading}
      />
    </>
  );
}