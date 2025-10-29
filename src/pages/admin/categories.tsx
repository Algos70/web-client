import { ReactElement } from "react";
import AuthenticatedLayout from "../../components/layouts/AuthenticatedLayout";
import CategoryManagement from "../../components/admin/CategoryManagement";

export default function AdminCategories() {
  return (
    <div className="py-8">
      <CategoryManagement />
    </div>
  );
}

AdminCategories.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedLayout>{page}</AuthenticatedLayout>;
};

// Explicitly require authentication
AdminCategories.requireAuth = true;