interface CartHeaderProps {
  itemCount: number;
  isClearing: boolean;
  onClearCart: () => void;
}

export default function CartHeader({
  itemCount,
  isClearing,
  onClearCart,
}: CartHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-slate-900">Shopping Cart</h1>
      {itemCount > 0 && (
        <button
          onClick={onClearCart}
          disabled={isClearing}
          className="text-red-600 hover:text-red-800 hover:cursor-pointer text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isClearing ? "Clearing..." : "Clear Cart"}
        </button>
      )}
    </div>
  );
}