import { useRouter } from "next/router";

interface CategoryHeaderProps {
  categoryName?: string;
  productsCount: number;
  totalProducts: number;
}

export default function CategoryHeader({ 
  categoryName, 
  productsCount, 
  totalProducts 
}: CategoryHeaderProps) {
  const router = useRouter();

  return (
    <div className="mb-8">
      <nav className="flex mb-4" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          <li>
            <button
              onClick={() => router.push('/')}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              Home
            </button>
          </li>
          <li>
            <span className="text-gray-400 mx-2">/</span>
            <span className="text-gray-900 font-medium">Categories</span>
          </li>
          <li>
            <span className="text-gray-400 mx-2">/</span>
            <span className="text-gray-900 font-medium">{categoryName}</span>
          </li>
        </ol>
      </nav>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{categoryName}</h1>
      <p className="text-gray-600">
        Showing {productsCount} of {totalProducts} products
      </p>
    </div>
  );
}