import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useAuth } from "../lib/contexts/AuthContext";
import { hasPermission } from "../lib/utils/permissions";
import { ROUTES } from "../lib/constants/routes";
import AuthenticatedLayout from "../components/layouts/AuthenticatedLayout";
import LoadingSpinner from "../components/auth/LoadingSpinner";
import CategoryManagement from "../components/admin/category/CategoryManagement";
import ProductManagement from "../components/admin/product/ProductManagement";
import AdminBreadcrumb from "../components/admin/AdminBreadcrumb";
import AdminDashboard from "../components/admin/AdminDashboard";

export default function AdminPanel() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [currentView, setCurrentView] = useState<
    "dashboard" | "categories" | "products"
  >("dashboard");

  // Define getPageTitle function before using it
  const getPageTitle = () => {
    switch (currentView) {
      case "categories":
        return "Kategori Yönetimi - Admin Panel";
      case "products":
        return "Ürün Yönetimi - Admin Panel";
      default:
        return "Admin Panel - E-Ticaret Mağazası";
    }
  };

  useEffect(() => {
    if (!loading && user) {
      const isAdmin = hasPermission(user.permissions, "admin_read");
      if (!isAdmin) {
        // Redirect to home if user doesn't have admin permissions
        router.push(ROUTES.HOME);
      }
    }
  }, [user, loading, router]);

  // Update document title when view changes
  useEffect(() => {
    document.title = getPageTitle();
  }, [currentView]);

  if (loading) {
    return <LoadingSpinner />;
  }

  const isAdmin = hasPermission(user?.permissions, "admin_read");

  if (!isAdmin) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Head>
        <title>{getPageTitle()}</title>
        <meta name="description" content="E-ticaret mağazası yönetim paneli." />
      </Head>
      <div className="py-6 bg-gradient-to-br from-slate-50 to-sky-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdminBreadcrumb
            currentView={currentView}
            onNavigate={setCurrentView}
          />

          {currentView === "categories" ? (
            <CategoryManagement />
          ) : currentView === "products" ? (
            <ProductManagement />
          ) : (
            <AdminDashboard onNavigate={setCurrentView} />
          )}
        </div>
      </div>
    </>
  );
}

AdminPanel.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedLayout>{page}</AuthenticatedLayout>;
};

// Explicitly require authentication
AdminPanel.requireAuth = true;
