import { useAuth } from '../../../lib/hooks/useAuth';
import { useRouter } from 'next/router';
import { ROUTES } from '../../../lib/constants/routes';

export default function UserMenu() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push(ROUTES.LOGIN);
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="hidden sm:flex items-center space-x-3">
        <span className="text-sm text-gray-700">
          Welcome, {user?.name}
        </span>
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-medium">
            {user?.name?.charAt(0).toUpperCase()}
          </span>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
      >
        Logout
      </button>
    </div>
  );
}