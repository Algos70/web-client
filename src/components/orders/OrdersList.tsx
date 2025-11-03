import OrderItem from "./OrderItem";

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

interface OrdersListProps {
  orders: Order[];
}

export default function OrdersList({ orders }: OrdersListProps) {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </div>
  );
}