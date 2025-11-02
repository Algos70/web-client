import { ReactElement } from "react";
import Head from "next/head";
import AuthenticatedLayout from "../components/layouts/AuthenticatedLayout";
import {
  OrdersHeader,
  OrdersList,
  EmptyOrders,
  OrdersLoadingState,
  OrdersErrorState,
} from "../components/orders";
import { useUserOrders } from "../lib/graphql/hooks";

export default function MyOrders() {
  const {
    data: ordersData,
    loading: ordersLoading,
    error: ordersError,
  } = useUserOrders();

  const orders = ordersData?.userOrders?.orders || [];

  if (ordersLoading) {
    return <OrdersLoadingState />;
  }

  if (ordersError) {
    return <OrdersErrorState error={ordersError.message} />;
  }

  return (
    <>
      <Head>
        <title>My Orders - E-Commerce Store</title>
        <meta name="description" content="View and track your order history." />
      </Head>
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="space-y-6">
              <OrdersHeader />
              {orders.length === 0 ? (
                <EmptyOrders />
              ) : (
                <OrdersList orders={orders} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

MyOrders.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedLayout>{page}</AuthenticatedLayout>;
};

// Explicitly require authentication
MyOrders.requireAuth = true;
