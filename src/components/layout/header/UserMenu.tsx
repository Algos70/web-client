import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../../lib/hooks/useAuth';
import { useRouter } from 'next/router';
import { ROUTES } from '../../../lib/constants/routes';
import { hasPermission } from '../../../lib/utils/permissions';

export default function UserMenu() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await logout();
    router.push(ROUTES.LOGIN);
  };

  const handleProfile = () => {
    router.push(ROUTES.PROFILE);
    setIsOpen(false);
  };

  const handleAdminPanel = () => {
    router.push(ROUTES.ADMIN_PANEL);
    setIsOpen(false);
  };

  const isAdmin = hasPermission(user?.permissions, 'admin_read');

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors cursor-pointer"
      >
        <span className="hidden sm:block text-sm text-gray-700">
          Welcome, {user?.name}
        </span>
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-medium">
            {user?.name?.charAt(0).toUpperCase()}
          </span>
        </div>
        {/* Dropdown arrow */}
        <svg 
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
          <button
            onClick={handleProfile}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Profile
          </button>
          {isAdmin && (
            <>
              <hr className="my-1 border-gray-200" />
              <button
                onClick={handleAdminPanel}
                className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
              >
                Admin Panel
              </button>
            </>
          )}
          <hr className="my-1 border-gray-200" />
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}