import { ReactElement, useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import AuthenticatedLayout from "../components/layouts/AuthenticatedLayout";
import {
  useUserCart,
  useUserWallets,
  useCreateOrderFromCart,
} from "../lib/graphql/hooks";
import { formatCurrency } from "../lib/utils/currency";
import OrderSummary from "../components/payment/OrderSummary";
import WalletSelector from "../components/payment/WalletSelector";
import PaymentActions from "../components/payment/PaymentActions";
import PaymentHeader from "../components/payment/PaymentHeader";
import LoadingState from "../components/payment/LoadingState";
import ErrorState from "../components/payment/ErrorState";

export default function PaymentPage() {
  const router = useRouter();
  const { data: cartData, loading: cartLoading, error: cartError } = useUserCart();
  const { data: walletsData, loading: walletsLoading, error: walletsError } = useUserWallets();
  const [createOrderFromCart, { loading: orderLoading }] = useCreateOrderFromCart();
  
  const [selectedWalletId, setSelectedWalletId] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const cart = cartData?.userCart;
  const items = cart?.success ? cart.cartItems : [];
  const walletsResult = walletsData?.userWallets;
  const wallets = walletsResult?.wallets || [];

  // Handle UserWalletsResult error states
  if (walletsResult && !walletsResult.success && !walletsLoading) {
    return <ErrorState message={walletsResult.message || "Failed to load wallets"} />;
  }

  // Get unique currencies from cart items
  const cartCurrencies = Array.from(
    new Set(items.map(item => item.product.currency))
  );

  // Filter wallets that match cart currencies
  const compatibleWallets = wallets.filter(wallet => 
    cartCurrencies.includes(wallet.currency)
  );

  // Calculate total for each currency
  const totals = cartCurrencies.reduce((acc, currency) => {
    const currencyItems = items.filter(item => item.product.currency === currency);
    const total = currencyItems.reduce((sum, item) => 
      sum + (item.product.priceMinor * item.qty), 0
    );
    acc[currency] = total;
    return acc;
  }, {} as Record<string, number>);

  // Auto-select first compatible wallet
  useEffect(() => {
    if (compatibleWallets.length > 0 && !selectedWalletId) {
      setSelectedWalletId(compatibleWallets[0].id);
    }
  }, [compatibleWallets, selectedWalletId]);

  // Redirect if cart is empty
  useEffect(() => {
    if (!cartLoading && items.length === 0) {
      router.push('/cart');
    }
  }, [cartLoading, items.length, router]);

  const handleCreateOrder = async () => {
    if (!selectedWalletId) {
      toast.error("Please select a wallet to proceed");
      return;
    }

    const selectedWallet = compatibleWallets.find(w => w.id === selectedWalletId);
    if (!selectedWallet) {
      toast.error("Selected wallet not found");
      return;
    }

    // Check if wallet has sufficient balance
    const requiredAmount = totals[selectedWallet.currency] || 0;
    const walletBalance = parseInt(selectedWallet.balanceMinor);
    
    if (walletBalance < requiredAmount) {
      toast.error(`Insufficient balance. Required: ${formatCurrency(requiredAmount.toString(), selectedWallet.currency)}, Available: ${formatCurrency(selectedWallet.balanceMinor, selectedWallet.currency)}`);
      return;
    }

    setIsProcessing(true);
    try {
      const result = await createOrderFromCart({
        variables: {
          input: {
            walletId: selectedWalletId,
          },
        },
        errorPolicy: "all",
      });

      // Check if there are GraphQL errors in the result
      if (result.error) {
        const error = result.error as any;
        if (error.errors && error.errors.length > 0) {
          const errorMessage = error.errors[0].message;
          toast.error(errorMessage, {
            className: 'order-error-toast'
          });
        } else if (error.networkError) {
          toast.error("Network error occurred. Please try again.", {
            className: 'order-error-toast'
          });
        } else {
          toast.error("An error occurred while creating the order.", {
            className: 'order-error-toast'
          });
        }
      } else if (result.data?.createOrderFromCart?.success) {
        toast.success(result.data.createOrderFromCart.message || "Order placed successfully!", {
          className: 'order-success-toast'
        });
        // Redirect to order confirmation or orders page
        router.push('/my-orders');
      } else if (result.data?.createOrderFromCart && !result.data.createOrderFromCart.success) {
        toast.error(result.data.createOrderFromCart.message || "Failed to create order", {
          className: 'order-error-toast'
        });
      }
    } catch (error: any) {
      console.error("Error creating order:", error);
      // Handle network errors or other unexpected errors
      if (error.networkError) {
        toast.error("Network error occurred. Please try again.", {
          className: 'order-error-toast'
        });
      } else {
        toast.error("Failed to create order. Please try again.", {
          className: 'order-error-toast'
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartLoading || walletsLoading) {
    return <LoadingState />;
  }

  if (cartError || walletsError) {
    return <ErrorState message={cartError?.message || walletsError?.message || "Unknown error"} />;
  }

  if (items.length === 0) {
    return null; // Will redirect to cart
  }

  return (
    <>
      <Head>
        <title>Payment</title>
      </Head>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <PaymentHeader onBack={() => router.back()} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="space-y-6">
            <OrderSummary items={items} totals={totals} />
          </div>

          {/* Payment Method */}
          <div className="space-y-6">
            <WalletSelector
              compatibleWallets={compatibleWallets}
              selectedWalletId={selectedWalletId}
              onWalletSelect={setSelectedWalletId}
              totals={totals}
              cartCurrencies={cartCurrencies}
              onManageWallets={() => router.push('/my-wallets')}
            />

            <PaymentActions
              onPlaceOrder={handleCreateOrder}
              selectedWalletId={selectedWalletId}
              isProcessing={isProcessing}
              orderLoading={orderLoading}
              hasCompatibleWallets={compatibleWallets.length > 0}
            />
          </div>
        </div>
      </div>
    </>
  );
}

PaymentPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedLayout>{page}</AuthenticatedLayout>;
};