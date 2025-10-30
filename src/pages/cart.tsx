import { ReactElement, useState } from "react";
import Head from "next/head";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import AuthenticatedLayout from "../components/layouts/AuthenticatedLayout";
import {
  useUserCart,
  useRemoveItemFromCart,
  useClearCart,
  useUpdateItemQuantity,
  useDecreaseItemQuantity,
} from "../lib/graphql/hooks";

export default function CartPage() {
  const { data: cartData, loading, error } = useUserCart();
  const [removeItemFromCart] = useRemoveItemFromCart();
  const [clearCart] = useClearCart();
  const [updateItemQuantity] = useUpdateItemQuantity();
  const [decreaseItemQuantity] = useDecreaseItemQuantity();
  const [isClearing, setIsClearing] = useState(false);
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());

  const cart = cartData?.userCart;
  const items = cart?.items || [];

  const handleRemoveItem = async (productId: string) => {
    try {
      await removeItemFromCart({
        variables: { productId },
      });
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleClearCart = async () => {
    if (!confirm("Are you sure you want to clear your cart?")) return;

    setIsClearing(true);
    try {
      await clearCart();
    } catch (error) {
      console.error("Error clearing cart:", error);
    } finally {
      setIsClearing(false);
    }
  };

  const handleIncreaseQuantity = async (productId: string, currentQty: number) => {
    setUpdatingItems(prev => new Set(prev).add(productId));
    try {
      await updateItemQuantity({
        variables: {
          input: {
            productId,
            quantity: currentQty + 1
          }
        }
      });
    } catch (error) {
      console.error('Error updating item quantity:', error);
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const handleDecreaseQuantity = async (productId: string, currentQty: number) => {
    setUpdatingItems(prev => new Set(prev).add(productId));
    try {
      await decreaseItemQuantity({
        variables: {
          input: {
            productId,
            decreaseBy: 1
          }
        }
      });
    } catch (error) {
      console.error('Error decreasing item quantity:', error);
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      return total + item.product.priceMinor * item.qty;
    }, 0);
  };

  const formatPrice = (priceMinor: number, currency: string) => {
    const price = priceMinor / 100;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
    }).format(price);
  };

  if (loading) {
    return (
      <>
        <Head>
          <title>Shopping Cart</title>
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

  if (error) {
    return (
      <>
        <Head>
          <title>Shopping Cart</title>
        </Head>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">
              Shopping Cart
            </h1>
            <p className="text-red-600">Error loading cart: {error.message}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Shopping Cart</title>
      </Head>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Shopping Cart</h1>
          {items.length > 0 && (
            <button
              onClick={handleClearCart}
              disabled={isClearing}
              className="text-red-600 hover:text-red-800 hover:cursor-pointer text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isClearing ? "Clearing..." : "Clear Cart"}
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H19M7 13v4a2 2 0 002 2h8a2 2 0 002-2v-4m-8 2h.01M15 15h.01"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              Your cart is empty
            </h3>
            <p className="text-slate-500 mb-6">
              Start shopping to add items to your cart
            </p>
            <a
              href="/products"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 hover:cursor-pointer"
            >
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <ul className="divide-y divide-slate-200">
                {items.map((item) => (
                  <li key={item.id} className="p-6">
                    <div className="flex items-center">
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-slate-900">
                              {item.product.name}
                            </h3>
                            {item.product.category && (
                              <p className="text-sm text-slate-500">
                                {item.product.category.name}
                              </p>
                            )}
                            <p className="text-lg font-semibold text-slate-900 mt-1">
                              {formatPrice(
                                item.product.priceMinor,
                                item.product.currency
                              )}
                            </p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-slate-600">Qty:</span>
                              <div className="flex items-center space-x-1">
                                <button
                                  onClick={() => handleDecreaseQuantity(item.product.id, item.qty)}
                                  disabled={updatingItems.has(item.product.id)}
                                  className="p-1 rounded-md border border-slate-300 hover:bg-slate-50 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                  title="Decrease quantity"
                                >
                                  <MinusIcon className="h-4 w-4" />
                                </button>
                                <span className="font-medium min-w-[2rem] text-center">
                                  {updatingItems.has(item.product.id) ? "..." : item.qty}
                                </span>
                                <button
                                  onClick={() => handleIncreaseQuantity(item.product.id, item.qty)}
                                  disabled={updatingItems.has(item.product.id)}
                                  className="p-1 rounded-md border border-slate-300 hover:bg-slate-50 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                  title="Increase quantity"
                                >
                                  <PlusIcon className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-semibold text-slate-900">
                                {formatPrice(
                                  item.product.priceMinor * item.qty,
                                  item.product.currency
                                )}
                              </p>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-center text-lg font-semibold text-slate-900 mb-4">
                <span>Total:</span>
                <span>
                  {formatPrice(
                    calculateTotal(),
                    items[0]?.product.currency || "USD"
                  )}
                </span>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 hover:cursor-pointer transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

CartPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedLayout>{page}</AuthenticatedLayout>;
};
