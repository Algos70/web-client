interface PaymentHeaderProps {
  onBack: () => void;
}

export default function PaymentHeader({ onBack }: PaymentHeaderProps) {
  return (
    <div className="mb-6">
      <button
        onClick={onBack}
        className="text-blue-600 hover:text-blue-800 hover:cursor-pointer text-sm font-medium mb-4"
      >
        ← Back to Cart
      </button>
      <h1 className="text-2xl font-bold text-slate-900">Payment</h1>
    </div>
  );
}