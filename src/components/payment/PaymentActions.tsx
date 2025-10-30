interface PaymentActionsProps {
  onPlaceOrder: () => void;
  selectedWalletId: string;
  isProcessing: boolean;
  orderLoading: boolean;
  hasCompatibleWallets: boolean;
}

export default function PaymentActions({
  onPlaceOrder,
  selectedWalletId,
  isProcessing,
  orderLoading,
  hasCompatibleWallets,
}: PaymentActionsProps) {
  if (!hasCompatibleWallets) {
    return null;
  }

  return (
    <button
      onClick={onPlaceOrder}
      disabled={!selectedWalletId || isProcessing || orderLoading}
      className="w-full bg-green-600 text-white py-3 px-4 rounded-md font-medium hover:bg-green-700 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {isProcessing || orderLoading ? "Processing..." : "Place Order"}
    </button>
  );
}