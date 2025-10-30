import { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../lib/hooks/useAuth';
import { hasPermission } from '../lib/utils/permissions';
import { ROUTES } from '../lib/constants/routes';
import AuthenticatedLayout from '../components/layouts/AuthenticatedLayout';
import LoadingSpinner from '../components/auth/LoadingSpinner';
import CategoryManagement from '../components/admin/category/CategoryManagement';

export default function AdminPanel() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [currentView, setCurrentView] = useState<'dashboard' | 'categories'>('dashboard');

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

  // Breadcrumb component
  const Breadcrumb = () => (
    <div className="mb-6">
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <button
              onClick={() => setCurrentView('dashboard')}
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 hover:cursor-pointer"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
              Admin Dashboard
            </button>
          </li>
          {currentView === 'categories' && (
            <li>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">Category Management</span>
              </div>
            </li>
          )}
        </ol>
      </nav>
    </div>
  );

  return (
    <div className="py-6 bg-gradient-to-br from-slate-50 to-sky-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb />
        
        {currentView === 'categories' ? (
          <CategoryManagement />
        ) : (
          <>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Product Management */}
            <div className="card p-4 hover:shadow-lg transition-all duration-300 border-l-4 border-l-emerald-500">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="ml-3 text-base font-semibold text-slate-800">Product Management</h3>
              </div>
              <p className="text-slate-600 text-xs mb-4 leading-relaxed">
                Add, edit, and organize products with inventory management.
              </p>
              <button className="btn-success w-full text-sm py-2 hover:cursor-pointer">
                Manage Products
              </button>
            </div>

            {/* Category Management */}
            <div className="card p-4 hover:shadow-lg transition-all duration-300 border-l-4 border-l-amber-500">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="ml-3 text-base font-semibold text-slate-800">Category Management</h3>
              </div>
              <p className="text-slate-600 text-xs mb-4 leading-relaxed">
                Organize and manage product categories and subcategories.
              </p>
              <button 
                onClick={() => setCurrentView('categories')}
                className="btn-secondary w-full text-sm py-2 hover:cursor-pointer"
              >
                Manage Categories
              </button>
            </div>
          </div>
        </div>


          </>
        )}
      </div>
    </div>
  );
}

AdminPanel.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedLayout>{page}</AuthenticatedLayout>;
};

// Explicitly require authentication
AdminPanel.requireAuth = true;