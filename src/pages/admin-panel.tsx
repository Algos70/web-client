import { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../lib/hooks/useAuth';
import { hasPermission } from '../lib/utils/permissions';
import { ROUTES } from '../lib/constants/routes';
import AuthenticatedLayout from '../components/layouts/AuthenticatedLayout';
import LoadingSpinner from '../components/auth/LoadingSpinner';

export default function AdminPanel() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      const isAdmin = hasPermission(user.permissions, 'admin_read');
      if (!isAdmin) {
        // Redirect to home if user doesn't have admin permissions
        router.push(ROUTES.HOME);
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  const isAdmin = hasPermission(user?.permissions, 'admin_read');

  if (!isAdmin) {
    return <LoadingSpinner />;
  }

  return (
    <div className="py-6 bg-gradient-to-br from-slate-50 to-sky-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card p-6 mb-6">
          <div className="text-center mb-6">
            <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold gradient-text mb-2">Admin Dashboard</h1>
            <p className="text-sm text-slate-600 max-w-xl mx-auto">
              Control center for managing your e-commerce platform and monitoring operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {/* User Management */}
            <div className="card p-4 hover:shadow-lg transition-all duration-300 border-l-4 border-l-sky-500">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <h3 className="ml-3 text-base font-semibold text-slate-800">User Management</h3>
              </div>
              <p className="text-slate-600 text-xs mb-4 leading-relaxed">
                Manage customer accounts, permissions, and access controls.
              </p>
              <button className="btn-primary w-full text-sm py-2">
                Manage Users
              </button>
            </div>

            {/* Product Management */}
            <div className="card p-4 hover:shadow-lg transition-all duration-300 border-l-4 border-l-emerald-500">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="ml-3 text-base font-semibold text-slate-800">Product Catalog</h3>
              </div>
              <p className="text-slate-600 text-xs mb-4 leading-relaxed">
                Add, edit, and organize products with inventory management.
              </p>
              <button className="btn-success w-full text-sm py-2">
                Manage Products
              </button>
            </div>

            {/* Order Management */}
            <div className="card p-4 hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="ml-3 text-base font-semibold text-slate-800">Order Management</h3>
              </div>
              <p className="text-slate-600 text-xs mb-4 leading-relaxed">
                Process orders, track shipments, and manage transactions.
              </p>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg text-sm">
                Manage Orders
              </button>
            </div>

            {/* Analytics */}
            <div className="card p-4 hover:shadow-lg transition-all duration-300 border-l-4 border-l-amber-500">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <h3 className="ml-3 text-base font-semibold text-slate-800">Analytics</h3>
              </div>
              <p className="text-slate-600 text-xs mb-4 leading-relaxed">
                Monitor sales performance and business metrics.
              </p>
              <button className="btn-secondary w-full text-sm py-2">
                View Analytics
              </button>
            </div>

            {/* Settings */}
            <div className="card p-4 hover:shadow-lg transition-all duration-300 border-l-4 border-l-slate-500">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="ml-3 text-base font-semibold text-slate-800">Settings</h3>
              </div>
              <p className="text-slate-600 text-xs mb-4 leading-relaxed">
                Configure platform settings and preferences.
              </p>
              <button className="w-full bg-slate-600 hover:bg-slate-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg text-sm">
                Manage Settings
              </button>
            </div>

            {/* Reports */}
            <div className="card p-4 hover:shadow-lg transition-all duration-300 border-l-4 border-l-rose-500">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="ml-3 text-base font-semibold text-slate-800">Reports</h3>
              </div>
              <p className="text-slate-600 text-xs mb-4 leading-relaxed">
                Generate detailed reports and export data.
              </p>
              <button className="w-full bg-rose-600 hover:bg-rose-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg text-sm">
                Generate Reports
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-sky-600 mb-1">1,234</div>
            <div className="text-xs text-slate-600">Total Users</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-emerald-600 mb-1">567</div>
            <div className="text-xs text-slate-600">Products</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-amber-600 mb-1">89</div>
            <div className="text-xs text-slate-600">Pending Orders</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-rose-600 mb-1">$12.5K</div>
            <div className="text-xs text-slate-600">Monthly Revenue</div>
          </div>
        </div>
      </div>
    </div>
  );
}

AdminPanel.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedLayout>{page}</AuthenticatedLayout>;
};

// Explicitly require authentication
AdminPanel.requireAuth = true;