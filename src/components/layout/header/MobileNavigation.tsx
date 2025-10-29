import Link from 'next/link';
import { useRouter } from 'next/router';
import { ROUTES } from '../../../lib/constants/routes';

const navigationItems = [
  { href: ROUTES.HOME, label: 'Home' },
  { href: ROUTES.DASHBOARD, label: 'Dashboard' },
];

export default function MobileNavigation() {
  const router = useRouter();

  return (
    <div className="md:hidden border-t border-gray-200">
      <div className="px-2 pt-2 pb-3 space-y-1">
        {navigationItems.map((item) => (
          <Link 
            key={item.href}
            href={item.href}
            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
              router.pathname === item.href 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}