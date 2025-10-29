import { ReactElement } from 'react';
import { useAuth } from "../lib/hooks/useAuth";
import AuthenticatedLayout from '../components/layouts/AuthenticatedLayout';
import UserDashboard from "../components/auth/UserDashboard";

export default function Dashboard() {
  const { user } = useAuth();

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

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <UserDashboard 
            user={user} 
            onCallBackend={callBackend} 
            onLogout={() => {}} // Logout handled by layout
          />
        </div>
      </div>
    </div>
  );
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedLayout>{page}</AuthenticatedLayout>;
};

// Explicitly require authentication
Dashboard.requireAuth = true;