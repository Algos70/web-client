import Link from 'next/link';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '#', label: 'About' },
  { href: '#', label: 'Contact' },
];

export default function QuickLinks() {
  return (
    <div>
      <h4 className="text-sm font-semibold text-gray-900 mb-4">Quick Links</h4>
      <ul className="space-y-2">
        {quickLinks.map((link) => (
          <li key={link.href}>
            <Link 
              href={link.href} 
              className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}