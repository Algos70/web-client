import { ReactElement, useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import AuthenticatedLayout from "../components/layouts/AuthenticatedLayout";
import {
  useUserCart,
  useUserWallets,
  useCreateOrderFromCart,
} from "../lib/graphql/hooks";
import { formatCurrency } from "../lib/utils/currency";
import type { Wallet } from "../lib/graphql/types";

export default function PaymentPage() {
  const router = useRouter();
  const { data: cartData, loading: cartLoading, error: cartError } = useUserCart();
  const { data: walletsData, loading: walletsLoading, error: walletsError } = useUserWallets();
  const [createOrderFromCart, { loading: orderLoading }] = useCreateOrderFromCart();
  
  const [selectedWalletId, setSelectedWalletId] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const cart = cartData?.userCart;
  const items = cart?.items || [];
  const wallets = walletsData?.userWallets || [];

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
      alert("Please select a wallet to proceed");
      return;
    }

    const selectedWallet = compatibleWallets.find(w => w.id === selectedWalletId);
    if (!selectedWallet) {
      alert("Selected wallet not found");
      return;
    }

    // Check if wallet has sufficient balance
    const requiredAmount = totals[selectedWallet.currency] || 0;
    const walletBalance = parseInt(selectedWallet.balanceMinor);
    
    if (walletBalance < requiredAmount) {
      alert(`Insufficient balance. Required: ${formatCurrency(requiredAmount.toString(), selectedWallet.currency)}, Available: ${formatCurrency(selectedWallet.balanceMinor, selectedWallet.currency)}`);
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
      });

      if (result.data?.createOrderFromCart) {
        // Redirect to order confirmation or orders page
        router.push('/profile?tab=orders');
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to create order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartLoading || walletsLoading) {
    return (
      <>
        <Head>
          <title>Payment</title>
        </Head>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded w-1/4 mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-slate-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  if (cartError || walletsError) {
    return (
      <>
        <Head>
          <title>Payment</title>
        </Head>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">Payment</h1>
            <p className="text-red-600">
              Error loading data: {cartError?.message || walletsError?.message}
            </p>
          </div>
        </div>
      </>
    );
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
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-4"
          >
            ← Back to Cart
          </button>
          <h1 className="text-2xl font-bold text-slate-900">Payment</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Order Summary
              </h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-medium text-slate-900">
                        {item.product.name}
                      </h3>
                      {item.product.category && (
                        <p className="text-sm text-slate-500">
                          {item.product.category.name}
                        </p>
                      )}
                      <p className="text-sm text-slate-600">
                        Quantity: {item.qty}
                      </p>
                      <p className="text-sm font-medium text-slate-900">
                        {formatCurrency(
                          item.product.priceMinor.toString(),
                          item.product.currency
                        )} each
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-slate-900">
                        {formatCurrency(
                          (item.product.priceMinor * item.qty).toString(),
                          item.product.currency
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-slate-200 mt-4 pt-4">
                {Object.entries(totals).map(([currency, total]) => (
                  <div key={currency} className="flex justify-between items-center text-lg font-semibold text-slate-900">
                    <span>Total ({currency}):</span>
                    <span>{formatCurrency(total.toString(), currency)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Select Wallet
              </h2>
              
              {compatibleWallets.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-slate-500 mb-4">
                    No compatible wallets found for currencies: {cartCurrencies.join(", ")}
                  </p>
                  <button
                    onClick={() => router.push('/my-wallets')}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Manage Wallets
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {compatibleWallets.map((wallet) => {
                    const requiredAmount = totals[wallet.currency] || 0;
                    const walletBalance = parseInt(wallet.balanceMinor);
                    const hasSufficientBalance = walletBalance >= requiredAmount;
                    
                    return (
                      <label
                        key={wallet.id}
                        className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedWalletId === wallet.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-slate-200 hover:border-slate-300"
                        } ${
                          !hasSufficientBalance ? "opacity-50" : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="wallet"
                          value={wallet.id}
                          checked={selectedWalletId === wallet.id}
                          onChange={(e) => setSelectedWalletId(e.target.value)}
                          disabled={!hasSufficientBalance}
                          className="sr-only"
                        />
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="flex items-center">
                              <span className="font-medium text-slate-900">
                                {wallet.currency} Wallet
                              </span>
                              {selectedWalletId === wallet.id && (
                                <CheckCircleIcon className="h-5 w-5 text-blue-500 ml-2" />
                              )}
                            </div>
                            <p className="text-sm text-slate-600">
                              Balance: {formatCurrency(wallet.balanceMinor, wallet.currency)}
                            </p>
                            {!hasSufficientBalance && (
                              <p className="text-sm text-red-600">
                                Insufficient balance (need {formatCurrency(requiredAmount.toString(), wallet.currency)})
                              </p>
                            )}
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            {compatibleWallets.length > 0 && (
              <button
                onClick={handleCreateOrder}
                disabled={!selectedWalletId || isProcessing || orderLoading}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-md font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isProcessing || orderLoading ? "Processing..." : "Place Order"}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

PaymentPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedLayout>{page}</AuthenticatedLayout>;
};