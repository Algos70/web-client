import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Logo from "../common/Logo";
import UserMenu from "./header/UserMenu";
import { useUserCart } from "@/lib/graphql/hooks";

export default function Header() {
  const { data: cartData } = useUserCart();
  const cartItems = cartData?.userCart?.success ? cartData.userCart.cartItems : [];
  const itemCount = cartItems.reduce((total, item) => total + item.qty, 0);

  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo size="md" />
          <div className="flex items-center space-x-4">
            <UserMenu />
            <Link
              id="cart-button"
              href="/cart"
              className="relative p-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
