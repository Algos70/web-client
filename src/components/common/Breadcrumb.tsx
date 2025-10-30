import { useRouter } from "next/router";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const router = useRouter();

  const handleClick = (href?: string) => {
    if (href) {
      router.push(href);
    }
  };

  return (
    <nav className="flex mb-8" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index}>
            {index > 0 && <span className="text-gray-400 mx-2">/</span>}
            {item.href && !item.isActive ? (
              <button
                onClick={() => handleClick(item.href)}
                className="text-gray-500 hover:text-gray-700 transition-colors font-medium"
              >
                {item.label}
              </button>
            ) : (
              <span className={`font-medium ${item.isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}