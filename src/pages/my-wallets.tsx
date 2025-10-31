import { ReactElement } from "react";
import Head from "next/head";
import AuthenticatedLayout from "../components/layouts/AuthenticatedLayout";
import WalletPageHeader from "../components/wallet/WalletPageHeader";
import WalletGrid from "../components/wallet/WalletGrid";
import EmptyWalletState from "../components/wallet/EmptyWalletState";
import {
  WalletsLoadingState,
  WalletsErrorState,
  WalletsModals,
  useWalletOperations,
} from "../components/wallets";
import { useUserWallets } from "../lib/graphql/hooks";

export default function MyWalletsPage() {
  const {
    data: walletsData,
    loading: walletsLoading,
    error: walletsError,
  } = useUserWallets();

  const wallets = walletsData?.userWallets || [];
  
  const {
    // State
    showCreateForm,
    newWalletCurrency,
    showAddFundsModal,
    addFundsAmount,
    showTransferModal,
    transferTargetWalletId,
    transferAmount,
    deleteModal,

    // Loading states
    createLoading,
    deleteLoading,
    increaseLoading,
    transferLoading,

    // Handlers
    handleCreateWallet,
    handleDeleteWallet,
    confirmDeleteWallet,
    handleAddFunds,
    handleAddFundsSubmit,
    handleTransfer,
    handleTransferSubmit,

    // Setters
    setShowCreateForm,
    setNewWalletCurrency,
    setShowAddFundsModal,
    setAddFundsAmount,
    setShowTransferModal,
    setTransferTargetWalletId,
    setTransferAmount,
    setDeleteModal,
  } = useWalletOperations(wallets);

  if (walletsLoading) {
    return <WalletsLoadingState />;
  }

  if (walletsError) {
    return <WalletsErrorState error={walletsError.message} />;
  }

  return (
    <>
      <Head>
        <title>My Wallets</title>
        <meta name="description" content="Manage your digital wallets" />
      </Head>

      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <WalletPageHeader onCreateWallet={() => setShowCreateForm(true)} />

          {wallets.length === 0 ? (
            <EmptyWalletState onCreateWallet={() => setShowCreateForm(true)} />
          ) : (
            <WalletGrid
              wallets={wallets}
              onDelete={handleDeleteWallet}
              onAddFunds={handleAddFunds}
              onTransfer={handleTransfer}
              isLoading={deleteLoading || increaseLoading || transferLoading}
            />
          )}
        </div>
      </div>

      <WalletsModals
        showCreateForm={showCreateForm}
        newWalletCurrency={newWalletCurrency}
        createLoading={createLoading}
        onCurrencyChange={setNewWalletCurrency}
        onCreateSubmit={handleCreateWallet}
        onCreateClose={() => setShowCreateForm(false)}
        showAddFundsModal={showAddFundsModal}
        addFundsAmount={addFundsAmount}
        increaseLoading={increaseLoading}
        onAddFundsAmountChange={setAddFundsAmount}
        onAddFundsSubmit={handleAddFundsSubmit}
        onAddFundsClose={() => setShowAddFundsModal(null)}
        showTransferModal={showTransferModal}
        transferTargetWalletId={transferTargetWalletId}
        transferAmount={transferAmount}
        transferLoading={transferLoading}
        onTransferTargetWalletIdChange={setTransferTargetWalletId}
        onTransferAmountChange={setTransferAmount}
        onTransferSubmit={handleTransferSubmit}
        onTransferClose={() => setShowTransferModal(null)}
        deleteModal={deleteModal}
        deleteLoading={deleteLoading}
        onDeleteConfirm={confirmDeleteWallet}
        onDeleteCancel={() =>
          setDeleteModal({ isOpen: false, walletId: "", walletCurrency: "" })
        }
      />
    </>
  );
}

MyWalletsPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedLayout>{page}</AuthenticatedLayout>;
};

// Explicitly require authentication
MyWalletsPage.requireAuth = true;
