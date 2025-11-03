import { ReactElement} from 'react';
import Head from "next/head";
import { useAuth } from "../lib/contexts/AuthContext";
import AuthenticatedLayout from '../components/layouts/AuthenticatedLayout';
import UserDashboard from "../components/auth/UserDashboard";

export default function Profile() {
  const { user } = useAuth();



  return (
    <>
      <Head>
        <title>Profile - E-Commerce Store</title>
        <meta name="description" content="User profile and account settings." />
      </Head>
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <UserDashboard 
              user={user} 
              onLogout={() => {}} // Logout handled by header
            />
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