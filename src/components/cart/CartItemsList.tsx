import CartItem from "./CartItem";

interface CartItem {
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
}

interface CartItemsListProps {
  items: CartItem[];
  updatingItems: Set<string>;
  onIncreaseQuantity: (productId: string, currentQty: number) => void;
  onDecreaseQuantity: (productId: string) => void;
}

export default function CartItemsList({
  items,
  updatingItems,
  onIncreaseQuantity,
  onDecreaseQuantity,
}: CartItemsListProps) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <ul className="divide-y divide-slate-200">
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            isUpdating={updatingItems.has(item.product.id)}
            onIncreaseQuantity={onIncreaseQuantity}
            onDecreaseQuantity={onDecreaseQuantity}
          />
        ))}
      </ul>
    </div>
  );
}