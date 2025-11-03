import { formatCurrency } from "../../lib/utils/currency";

interface OrderItemData {
  id: string;
  qty: number;
  unitPriceMinor: string;
  currency: string;
  product: {
    name: string;
  };
}

interface Order {
  id: string;
  createdAt: string;
  totalMinor: string;
  currency: string;
  status: string;
  items: OrderItemData[];
}

interface OrderItemProps {
  order: Order;
}

const getStatusStyles = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-slate-100 text-slate-800";
  }
};

export default function OrderItem({ order }: OrderItemProps) {
  return (
    <div
      id={`order-${order.id}`}
      className="border border-slate-200 rounded-lg p-6"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Order #{order.id.slice(-8)}
          </h3>
          <p className="text-sm text-slate-600">
            Placed on{" "}
            {new Date(parseInt(order.createdAt)).toLocaleDateString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-slate-900">
            {formatCurrency(order.totalMinor, order.currency)}
          </p>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(
              order.status
            )}`}
          >
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium text-slate-900">Items:</h4>
        {order.items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center text-sm"
          >
            <span className="text-slate-600">
              {item.product.name} × {item.qty}
            </span>
            <span className="text-slate-900">
              {formatCurrency(item.unitPriceMinor, item.currency)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}