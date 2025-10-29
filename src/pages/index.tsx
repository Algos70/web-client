import { ReactElement } from "react";
import AuthenticatedLayout from "../components/layouts/AuthenticatedLayout";
import { ROUTES } from "../lib/constants/routes";
import Link from "next/link";

export default function Home() {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">E-Commerce Store 🚀</h1>
          <p className="text-lg text-gray-600 mb-8">
            Welcome to our store! Browse our products and categories below.
          </p>
          
          <div className="flex space-x-4 justify-center mb-8">
            <Link
              href={ROUTES.PROFILE}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Go to Profile
            </Link>
            <Link
              href={ROUTES.ADMIN_CATEGORIES}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Admin Categories
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedLayout>{page}</AuthenticatedLayout>;
};

// Explicitly require authentication
Home.requireAuth = true;
