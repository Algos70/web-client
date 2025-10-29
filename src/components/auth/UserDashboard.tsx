import { User } from "../../lib/types/auth";
import {
  formatPermission,
  getPermissionColor,
} from "../../lib/utils/permissions";

interface UserDashboardProps {
  user: User | null;
  onCallBackend: () => void;
  onLogout?: () => void;
}

export default function UserDashboard({
  user,
  onCallBackend,
}: UserDashboardProps) {
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
          <span className="font-medium">Username:</span>{" "}
          {user?.preferred_username}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Email Verified:</span>{" "}
          {user?.email_verified ? "Yes" : "No"}
        </p>
        <div className="text-gray-600">
          <span className="font-medium">Permissions:</span>
          <div className="mt-2 flex flex-wrap gap-1">
            {user?.permissions?.map((permission: string, index: number) => (
              <span
                key={index}
                className={`inline-block text-xs px-2 py-1 rounded ${getPermissionColor(
                  permission
                )}`}
              >
                {formatPermission(permission)}
              </span>
            ))}
          </div>
        </div>
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
