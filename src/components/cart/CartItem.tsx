import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import { formatCurrency } from "../../lib/utils/currency";

interface CartItemProps {
  item: {
    id: string;
    qty: number;
    product: {
      id: string;
      name: string;
      priceMinor: number;
      currency: string;
      category?: {
        name: string;
      };
    };
  };
  isUpdating: boolean;
  onIncreaseQuantity: (productId: string, currentQty: number) => void;
  onDecreaseQuantity: (productId: string) => void;
}

export default function CartItem({
  item,
  isUpdating,
  onIncreaseQuantity,
  onDecreaseQuantity,
}: CartItemProps) {
  return (
    <li className="p-6">
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
                {formatCurrency(
                  item.product.priceMinor.toString(),
                  item.product.currency
                )}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-slate-600">Qty:</span>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => onDecreaseQuantity(item.product.id)}
                    disabled={isUpdating}
                    className="p-1 rounded-md border border-slate-300 hover:bg-slate-50 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Decrease quantity"
                  >
                    <MinusIcon className="h-4 w-4" />
                  </button>
                  <span className="font-medium min-w-[2rem] text-center">
                    {isUpdating ? "..." : item.qty}
                  </span>
                  <button
                    onClick={() =>
                      onIncreaseQuantity(item.product.id, item.qty)
                    }
                    disabled={isUpdating}
                    className="p-1 rounded-md border border-slate-300 hover:bg-slate-50 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Increase quantity"
                  >
                    <PlusIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-slate-900">
                  {formatCurrency(
                    (item.product.priceMinor * item.qty).toString(),
                    item.product.currency
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}