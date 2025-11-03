import { useRouter } from "next/router";
import { formatCurrency } from "../../lib/utils/currency";

interface CartSummaryProps {
  total: number;
  currency: string;
}

export default function CartSummary({ total, currency }: CartSummaryProps) {
  const router = useRouter();

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center text-lg font-semibold text-slate-900 mb-4">
        <span>Total:</span>
        <span>{formatCurrency(total.toString(), currency)}</span>
      </div>
      <button
        id="checkout-button"
        onClick={() => router.push("/payment")}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 hover:cursor-pointer transition-colors"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}