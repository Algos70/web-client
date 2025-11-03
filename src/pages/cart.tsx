import { ReactElement, useState } from "react";
import Head from "next/head";
import AuthenticatedLayout from "../components/layouts/AuthenticatedLayout";
import ClearCartModal from "../components/modal/ClearCartModal";
import {
  CartHeader,
  CartItemsList,
  CartSummary,
  EmptyCart,
  CartLoadingState,
  CartErrorState,
} from "../components/cart";
import {
  useUserCart,
  useClearCart,
  useUpdateItemQuantity,
  useDecreaseItemQuantity,
} from "../lib/graphql/hooks";

export default function CartPage() {
  const { data: cartData, loading, error } = useUserCart();
  const [clearCart] = useClearCart();
  const [updateItemQuantity] = useUpdateItemQuantity();
  const [decreaseItemQuantity] = useDecreaseItemQuantity();
  const [isClearing, setIsClearing] = useState(false);
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());
  const [showClearModal, setShowClearModal] = useState(false);

  const cart = cartData?.userCart;
  const items = cart?.success ? cart.cartItems : [];

  const handleClearCart = async () => {
    setIsClearing(true);
    try {
      const result = await clearCart();
      if (result.data?.clearCart?.success) {
        setShowClearModal(false);
      } else {
        console.error("Failed to clear cart:", result.data?.clearCart?.message);
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    } finally {
      setIsClearing(false);
    }
  };

  const handleIncreaseQuantity = async (
    productId: string,
    currentQty: number
  ) => {
    setUpdatingItems((prev) => new Set(prev).add(productId));
    try {
      await updateItemQuantity({
        variables: {
          input: {
            productId,
            quantity: currentQty + 1,
          },
        },
      });
    } catch (error) {
      console.error("Error updating item quantity:", error);
    } finally {
      setUpdatingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const handleDecreaseQuantity = async (productId: string) => {
    setUpdatingItems((prev) => new Set(prev).add(productId));
    try {
      await decreaseItemQuantity({
        variables: {
          input: {
            productId,
            decreaseBy: 1,
          },
        },
      });
    } catch (error) {
      console.error("Error decreasing item quantity:", error);
    } finally {
      setUpdatingItems((prev) => {
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

  if (loading) {
    return <CartLoadingState />;
  }

  if (error) {
    return <CartErrorState error={error.message} />;
  }

  return (
    <>
      <Head>
        <title>Shopping Cart</title>
      </Head>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <CartHeader
          itemCount={items.length}
          isClearing={isClearing}
          onClearCart={() => setShowClearModal(true)}
        />

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="space-y-6">
            <CartItemsList
              items={items}
              updatingItems={updatingItems}
              onIncreaseQuantity={handleIncreaseQuantity}
              onDecreaseQuantity={handleDecreaseQuantity}
            />

            <CartSummary
              total={calculateTotal()}
              currency={items[0]?.product.currency || "USD"}
            />
          </div>
        )}

        <ClearCartModal
          isOpen={showClearModal}
          onClose={() => setShowClearModal(false)}
          onConfirm={handleClearCart}
          isClearing={isClearing}
        />
      </div>
    </>
  );
}

CartPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedLayout>{page}</AuthenticatedLayout>;
};
