import { ReactElement } from 'react';
import Head from "next/head";
import { useRouter } from "next/router";
import AuthenticatedLayout from '../components/layouts/AuthenticatedLayout';
import { useUserOrders } from "../lib/graphql/hooks";
import { formatCurrency } from "../lib/utils/currency";

export default function MyOrders() {
  const router = useRouter();
  const { data: ordersData, loading: ordersLoading, error: ordersError } = useUserOrders();

  const orders = ordersData?.userOrders || [];

  if (ordersLoading) {
    return (
      <>
        <Head>
          <title>My Orders - E-Commerce Store</title>
          <meta name="description" content="View and track your order history." />
        </Head>
        <div className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-24 bg-slate-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (ordersError) {
    return (
      <>
        <Head>
          <title>My Orders - E-Commerce Store</title>
          <meta name="description" content="View and track your order history." />
        </Head>
        <div className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="text-center py-8">
                <p className="text-red-600">Error loading orders: {ordersError.message}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
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
              <div className="text-center">
                <h1 className="text-2xl font-bold text-slate-800 mb-1">My Orders</h1>
                <p className="text-slate-600 text-sm">
                  View and track your order history
                </p>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-slate-400 mb-4">
                    <svg
                      className="mx-auto h-12 w-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">
                    No orders yet
                  </h3>
                  <p className="text-slate-500 mb-6">
                    Start shopping to see your orders here
                  </p>
                  <button
                    onClick={() => router.push('/products')}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 hover:cursor-pointer"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-slate-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900">
                            Order #{order.id.slice(-8)}
                          </h3>
                          <p className="text-sm text-slate-600">
                            Placed on {new Date(parseInt(order.createdAt)).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-slate-900">
                            {formatCurrency(order.totalMinor, order.currency)}
                          </p>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            order.status === 'completed' 
                              ? 'bg-green-100 text-green-800'
                              : order.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : order.status === 'cancelled'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-slate-100 text-slate-800'
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium text-slate-900">Items:</h4>
                        {order.items.map((item) => (
                          <div key={item.id} className="flex justify-between items-center text-sm">
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
                  ))}
                </div>
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