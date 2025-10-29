import { ReactElement } from "react";
import AuthenticatedLayout from "../components/layouts/AuthenticatedLayout";
import { ROUTES } from "../lib/constants/routes";
import Link from "next/link";

export default function Home() {
  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Home Page</h1>
            <p className="text-lg text-gray-600 mb-8">
              Welcome! This is the home page.
            </p>

            <div className="space-y-4">
              <Link
                href={ROUTES.PROFILE}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Go to Profile
              </Link>
            </div>
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
