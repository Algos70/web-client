import React, { useState, ReactElement } from "react";
import Head from "next/head";
import toast from "react-hot-toast";
import AuthenticatedLayout from "../components/layouts/AuthenticatedLayout";
import WalletPageHeader from "../components/wallet/WalletPageHeader";
import CreateWalletModal from "../components/wallet/CreateWalletModal";
import AddFundsModal from "../components/wallet/AddFundsModal";
import WalletGrid from "../components/wallet/WalletGrid";
import EmptyWalletState from "../components/wallet/EmptyWalletState";

import DeleteConfirmationModal from "../components/admin/modals/DeleteConfirmationModal";
import {
  useUserWallets,
  useCreateUserWallet,
  useDeleteUserWallet,
  useIncreaseUserWalletBalance,
} from "../lib/graphql/hooks";

export default function MyWalletsPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newWalletCurrency, setNewWalletCurrency] = useState("USD");
  const [showAddFundsModal, setShowAddFundsModal] = useState<string | null>(
    null
  );
  const [addFundsAmount, setAddFundsAmount] = useState("");
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    walletId: string;
    walletCurrency: string;
  }>({
    isOpen: false,
    walletId: "",
    walletCurrency: "",
  });

  // Queries and Mutations
  const {
    data: walletsData,
    loading: walletsLoading,
    error: walletsError,
  } = useUserWallets();
  const [createUserWallet, { loading: createLoading }] = useCreateUserWallet();
  const [deleteUserWallet, { loading: deleteLoading }] = useDeleteUserWallet();
  const [increaseUserWalletBalance, { loading: increaseLoading }] =
    useIncreaseUserWalletBalance();

  const handleCreateWallet = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await createUserWallet({
        variables: {
          input: {
            currency: newWalletCurrency,
            initialBalance: 0,
          },
        },
        errorPolicy: "all",
      });

      // Check if there are GraphQL errors in the result
      if (result.error) {
        const error = result.error as any;
        if (error.errors && error.errors.length > 0) {
          const errorMessage = error.errors[0].message;
          toast.error(errorMessage);
        } else if (error.networkError) {
          toast.error("Network error occurred. Please try again.");
        } else {
          toast.error("Failed to create wallet");
        }
      } else {
        setShowCreateForm(false);
        setNewWalletCurrency("USD");
        toast.success("Wallet created successfully!");
      }
    } catch (error: any) {
      console.error("Error creating wallet:", error);

      // Handle network errors or other unexpected errors
      if (error.networkError) {
        toast.error("Network error occurred. Please try again.");
      } else {
        toast.error("Failed to create wallet");
      }
    }
  };

  const handleDeleteWallet = (walletId: string) => {
    const wallet = wallets.find((w) => w.id === walletId);
    setDeleteModal({
      isOpen: true,
      walletId,
      walletCurrency: wallet?.currency || "",
    });
  };

  const confirmDeleteWallet = async () => {
    try {
      const result = await deleteUserWallet({
        variables: { walletId: deleteModal.walletId },
        errorPolicy: "all",
      });

      // Check if there are GraphQL errors in the result
      if (result.error) {
        const error = result.error as any;
        if (error.errors && error.errors.length > 0) {
          const errorMessage = error.errors[0].message;
          toast.error(errorMessage);
        } else if (error.networkError) {
          toast.error("Network error occurred. Please try again.");
        } else {
          toast.error("Failed to delete wallet");
        }
        // Close modal on error
        setDeleteModal({ isOpen: false, walletId: "", walletCurrency: "" });
      } else {
        setDeleteModal({ isOpen: false, walletId: "", walletCurrency: "" });
        toast.success("Wallet deleted successfully!");
      }
    } catch (error: any) {
      console.error("Error deleting wallet:", error);

      // Handle network errors or other unexpected errors
      if (error.networkError) {
        toast.error("Network error occurred. Please try again.");
      } else {
        toast.error("Failed to delete wallet");
      }
      // Close modal on error
      setDeleteModal({ isOpen: false, walletId: "", walletCurrency: "" });
    }
  };

  const handleAddFunds = (walletId: string) => {
    setShowAddFundsModal(walletId);
    setAddFundsAmount("");
  };

  const handleAddFundsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showAddFundsModal || !addFundsAmount) return;

    try {
      const amountMinor = Math.round(parseFloat(addFundsAmount) * 100); // Convert to minor units
      const result = await increaseUserWalletBalance({
        variables: {
          walletId: showAddFundsModal,
          input: {
            amountMinor,
          },
        },
        errorPolicy: "all",
      });

      // Check if there are GraphQL errors in the result
      if (result.error) {
        const error = result.error as any;
        if (error.errors && error.errors.length > 0) {
          const errorMessage = error.errors[0].message;
          toast.error(errorMessage);
        } else if (error.networkError) {
          toast.error("Network error occurred. Please try again.");
        } else {
          toast.error("Failed to add funds");
        }
      } else {
        setShowAddFundsModal(null);
        setAddFundsAmount("");
        toast.success("Funds added successfully!");
      }
    } catch (error: any) {
      console.error("Error adding funds:", error);

      // Handle network errors or other unexpected errors
      if (error.networkError) {
        toast.error("Network error occurred. Please try again.");
      } else {
        toast.error("Failed to add funds");
      }
    }
  };

  const handleTransfer = (walletId: string) => {
    // TODO: Implement transfer modal
    toast.success("Transfer functionality will be implemented soon");
  };

  if (walletsLoading) {
    return (
      <>
        <Head>
          <title>My Wallets</title>
        </Head>
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (walletsError) {
    return (
      <>
        <Head>
          <title>My Wallets</title>
        </Head>
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-red-600 mb-4">
                Error Loading Wallets
              </h2>
              <p className="text-slate-600">{walletsError.message}</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  const wallets = walletsData?.userWallets || [];

  return (
    <>
      <Head>
        <title>My Wallets</title>
        <meta name="description" content="Manage your digital wallets" />
      </Head>

      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <WalletPageHeader onCreateWallet={() => setShowCreateForm(true)} />

          <CreateWalletModal
            isOpen={showCreateForm}
            currency={newWalletCurrency}
            loading={createLoading}
            onCurrencyChange={setNewWalletCurrency}
            onSubmit={handleCreateWallet}
            onClose={() => setShowCreateForm(false)}
          />

          <AddFundsModal
            isOpen={!!showAddFundsModal}
            amount={addFundsAmount}
            loading={increaseLoading}
            onAmountChange={setAddFundsAmount}
            onSubmit={handleAddFundsSubmit}
            onClose={() => setShowAddFundsModal(null)}
          />

          {wallets.length === 0 ? (
            <EmptyWalletState onCreateWallet={() => setShowCreateForm(true)} />
          ) : (
            <WalletGrid
              wallets={wallets}
              onDelete={handleDeleteWallet}
              onAddFunds={handleAddFunds}
              onTransfer={handleTransfer}
              isLoading={deleteLoading || increaseLoading}
            />
          )}
        </div>
      </div>



      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        title="Delete Wallet"
        itemName={`${deleteModal.walletCurrency} Wallet`}
        itemType="wallet"
        warningMessage="All funds in this wallet will be lost permanently."
        onConfirm={confirmDeleteWallet}
        onCancel={() =>
          setDeleteModal({ isOpen: false, walletId: "", walletCurrency: "" })
        }
        loading={deleteLoading}
      />
    </>
  );
}

MyWalletsPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedLayout>{page}</AuthenticatedLayout>;
};

// Explicitly require authentication
MyWalletsPage.requireAuth = true;
