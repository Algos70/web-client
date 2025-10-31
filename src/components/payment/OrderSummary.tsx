import { formatCurrency } from "../../lib/utils/currency";
import type { CartItem } from "../../lib/graphql/types";

interface OrderSummaryProps {
  items: CartItem[];
  totals: Record<string, number>;
}

export default function OrderSummary({ items, totals }: OrderSummaryProps) {
  return (
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
  );
}