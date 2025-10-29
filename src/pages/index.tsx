import { useAuth } from "../lib/hooks/useAuth";

export default function Home() {
  const { user, loading, login, logout, isAuthenticated } = useAuth();

  const callBackend = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/api/protected`, {
        credentials: "include",
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data);
      } else {
        console.error("Request failed:", response.status);
      }
    } catch (error) {
      console.error("Full error:", error);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        {!isAuthenticated ? (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Welcome</h1>
            <button 
              onClick={login}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
            >
              Login with Keycloak
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h1>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <p className="text-lg font-medium text-gray-900">
                Welcome, {user?.name}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Email:</span> {user?.email}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Roles:</span> {user?.roles?.join(", ")}
              </p>
            </div>
            
            <div className="space-y-3">
              <button 
                onClick={callBackend}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 ease-in-out"
              >
                Call Protected API
              </button>
              
              <button 
                onClick={logout}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 ease-in-out"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
