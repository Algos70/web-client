import { useState } from "react";
import toast from "react-hot-toast";
import { toMinorUnits } from "../../lib/utils/currency";
import {
  useCreateUserWallet,
  useDeleteUserWallet,
  useIncreaseUserWalletBalance,
  useTransferFromUserWallet,
} from "../../lib/graphql/hooks";

interface Wallet {
  id: string;
  currency: string;
  balanceMinor: string;
}

export function useWalletOperations(wallets: Wallet[]) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newWalletCurrency, setNewWalletCurrency] = useState("USD");
  const [showAddFundsModal, setShowAddFundsModal] = useState<string | null>(null);
  const [addFundsAmount, setAddFundsAmount] = useState("");
  const [showTransferModal, setShowTransferModal] = useState<string | null>(null);
  const [transferTargetWalletId, setTransferTargetWalletId] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    walletId: string;
    walletCurrency: string;
  }>({
    isOpen: false,
    walletId: "",
    walletCurrency: "",
  });

  const [createUserWallet, { loading: createLoading }] = useCreateUserWallet();
  const [deleteUserWallet, { loading: deleteLoading }] = useDeleteUserWallet();
  const [increaseUserWalletBalance, { loading: increaseLoading }] = useIncreaseUserWalletBalance();
  const [transferFromUserWallet, { loading: transferLoading }] = useTransferFromUserWallet();

  const handleError = (error: any, defaultMessage: string) => {
    if (error.errors && error.errors.length > 0) {
      toast.error(error.errors[0].message, {
        className: 'wallet-error-toast'
      });
    } else if (error.networkError) {
      toast.error("Network error occurred. Please try again.", {
        className: 'wallet-error-toast'
      });
    } else {
      toast.error(defaultMessage, {
        className: 'wallet-error-toast'
      });
    }
  };

  const handleCreateWallet = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await createUserWallet({
        variables: {
          input: {
            currency: newWalletCurrency,
            initialBalanceMinor: "0",
          },
        },
        errorPolicy: "all",
      });

      if (result.error) {
        handleError(result.error, "Failed to create wallet");
      } else if (result.data?.createUserWallet) {
        const { success, message } = result.data.createUserWallet;
        if (success) {
          setShowCreateForm(false);
          setNewWalletCurrency("USD");
          toast.success(message || "Wallet created successfully!", {
            className: 'wallet-success-toast'
          });
        } else {
          toast.error(message || "Failed to create wallet", {
            className: 'wallet-error-toast'
          });
        }
      }
    } catch (error: any) {
      console.error("Error creating wallet:", error);
      handleError(error, "Failed to create wallet");
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

      if (result.error) {
        handleError(result.error, "Failed to delete wallet");
      } else {
        toast.success("Wallet deleted successfully!", {
          className: 'wallet-success-toast'
        });
      }
      setDeleteModal({ isOpen: false, walletId: "", walletCurrency: "" });
    } catch (error: any) {
      console.error("Error deleting wallet:", error);
      handleError(error, "Failed to delete wallet");
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
      const amountMinor = toMinorUnits(addFundsAmount);
      const result = await increaseUserWalletBalance({
        variables: {
          walletId: showAddFundsModal,
          input: {
            amountMinor,
          },
        },
        errorPolicy: "all",
      });

      if (result.error) {
        handleError(result.error, "Failed to add funds");
      } else {
        setShowAddFundsModal(null);
        setAddFundsAmount("");
        toast.success("Funds added successfully!", {
          className: 'wallet-success-toast'
        });
      }
    } catch (error: any) {
      console.error("Error adding funds:", error);
      handleError(error, "Failed to add funds");
    }
  };

  const handleTransfer = (walletId: string) => {
    setShowTransferModal(walletId);
    setTransferTargetWalletId("");
    setTransferAmount("");
  };

  const handleTransferSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showTransferModal || !transferTargetWalletId || !transferAmount) return;

    try {
      const amountMinor = toMinorUnits(transferAmount);
      const wallet = wallets.find((w) => w.id === showTransferModal);

      const result = await transferFromUserWallet({
        variables: {
          input: {
            toWalletId: transferTargetWalletId,
            currency: wallet?.currency || "",
            amountMinor,
          },
        },
        errorPolicy: "all",
      });

      if (result.error) {
        handleError(result.error, "Failed to transfer funds");
      } else {
        setShowTransferModal(null);
        setTransferTargetWalletId("");
        setTransferAmount("");
        toast.success("Funds transferred successfully!", {
          className: 'wallet-success-toast'
        });
      }
    } catch (error: any) {
      console.error("Error transferring funds:", error);
      handleError(error, "Failed to transfer funds");
    }
  };

  return {
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
  };
}