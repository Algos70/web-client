import { useRouter } from "next/router";
import { Category } from "../../lib/graphql/types";

interface CategoryCardProps {
  category: Category;
  getCategoryColor: (slug: string) => string;
}

export default function CategoryCard({ category, getCategoryColor }: CategoryCardProps) {
  const router = useRouter();

  const handleCategoryClick = () => {
    router.push(`/categories/${category.slug}`);
  };

  return (
    <div
      className="group cursor-pointer"
      onClick={handleCategoryClick}
    >
      <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
        {/* Gradient background with unique color for each category */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(
            category.slug
          )} opacity-90 group-hover:opacity-95 transition-opacity duration-300`}
        ></div>

        {/* Optional subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        <div className="relative z-10 h-48 flex flex-col justify-end p-6 text-white">
          <div className="mb-4">
            {/* Category icon based on name */}
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-opacity-30 transition-all duration-300">
              <span className="text-2xl">🛍️</span>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-200 transition-colors duration-300">
            {category.name}
          </h3>
          <p className="text-sm text-white text-opacity-90 mb-2">
            Explore our {category.name.toLowerCase()} collection
          </p>
          <span className="text-xs text-gray-900 bg-white bg-opacity-90 px-2 py-1 rounded-full inline-block w-fit font-medium">
            {category.products?.length || 0} products
          </span>
        </div>
      </div>
    </div>
  );
}