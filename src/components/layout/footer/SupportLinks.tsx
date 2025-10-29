const supportLinks = [
  { href: '#', label: 'Help Center' },
  { href: '#', label: 'Privacy Policy' },
  { href: '#', label: 'Terms of Service' },
  { href: '#', label: 'FAQ' },
];

export default function SupportLinks() {
  return (
    <div>
      <h4 className="text-sm font-semibold text-gray-900 mb-4">Support</h4>
      <ul className="space-y-2">
        {supportLinks.map((link) => (
          <li key={link.href}>
            <a 
              href={link.href} 
              className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}