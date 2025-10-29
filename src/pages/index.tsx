import { ReactElement } from 'react';
import AuthenticatedLayout from '../components/layouts/AuthenticatedLayout';
import { ROUTES } from '../lib/constants/routes';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Ana Sayfa</h1>
          <p className="text-lg text-gray-600 mb-8">
            Hoş geldiniz! Bu ana sayfadır.
          </p>
          
          <div className="space-y-4">
            <Link 
              href={ROUTES.DASHBOARD}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Dashboard'a Git
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
