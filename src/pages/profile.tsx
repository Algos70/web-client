import { ReactElement, useState, useEffect } from 'react';
import Head from "next/head";
import { useRouter } from "next/router";
import { useAuth } from "../lib/hooks/useAuth";
import AuthenticatedLayout from '../components/layouts/AuthenticatedLayout';
import UserDashboard from "../components/auth/UserDashboard";
import { useUserOrders } from "../lib/graphql/hooks";
import { formatCurrency } from "../lib/utils/currency";

export default function Profile() {
  const router = useRouter();
  const { user } = useAuth();
  const { data: ordersData, loading: ordersLoading, error: ordersError } = useUserOrders();
  
  const [activeTab, setActiveTab] = useState('profile');

  // Check for tab parameter in URL
  useEffect(() => {
    const { tab } = router.query;
    if (tab && typeof tab === 'string') {
      setActiveTab(tab);
    }
  }, [router.query]);

  const orders = ordersData?.userOrders || [];

  const callBackend = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/api/protected`, {
        credentials: "include",
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data);
        alert(`API Response: ${JSON.stringify(data, null, 2)}`);
      } else {
        console.error("Request failed:", response.status);
        alert(`Request failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error("Full error:", error);
      alert(`Error: ${error}`);
    }
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'orders', name: 'Orders', icon: '📦' },
  ];

  return (
    <>
      <Head>
        <title>Profile - E-Commerce Store</title>
        <meta name="description" content="User profile and account settings." />
      </Head>
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="border-b border-slate-200">
              <nav className="-mb-px flex space-x-8 px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            {activeTab === 'profile' && (
              <UserDashboard 
                user={user} 
                onCallBackend={callBackend} 
                onLogout={() => {}} // Logout handled by header
              />
            )}

            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-slate-800 mb-1">My Orders</h1>
                  <p className="text-slate-600 text-sm">
                    View and track your order history
                  </p>
                </div>

                {ordersLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-24 bg-slate-200 rounded"></div>
                      </div>
                    ))}
                  </div>
                ) : ordersError ? (
                  <div className="text-center py-8">
                    <p className="text-red-600">Error loading orders: {ordersError.message}</p>
                  </div>
                ) : orders.length === 0 ? (
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
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
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
                              Placed on {new Date(order.createdAt).toLocaleDateString()}
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
            )}
          </div>
        </div>
      </div>
    </>
  );
}

Profile.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedLayout>{page}</AuthenticatedLayout>;
};

// Explicitly require authentication
Profile.requireAuth = true;