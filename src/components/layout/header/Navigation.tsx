import Link from 'next/link';
import { useRouter } from 'next/router';
import { ROUTES } from '../../../lib/constants/routes';

const navigationItems = [
  { href: ROUTES.HOME, label: 'Home' },
  { href: ROUTES.DASHBOARD, label: 'Dashboard' },
];

export default function Navigation() {
  const router = useRouter();

  return (
    <nav className="hidden md:flex space-x-8">
      {navigationItems.map((item) => (
        <Link 
          key={item.href}
          href={item.href}
          className={`text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            router.pathname === item.href ? 'text-blue-600 bg-blue-50' : ''
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}