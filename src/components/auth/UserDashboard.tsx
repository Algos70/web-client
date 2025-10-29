interface User {
  name?: string;
  email?: string;
  roles?: string[];
}

interface UserDashboardProps {
  user: User | null;
  onCallBackend: () => void;
  onLogout?: () => void; // Optional now
}

export default function UserDashboard({ user, onCallBackend, onLogout }: UserDashboardProps) {
  return (
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
          onClick={onCallBackend}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 ease-in-out"
        >
          Call Protected API
        </button>
      </div>
    </div>
  );
}